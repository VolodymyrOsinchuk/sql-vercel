const User = require("../models/user");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    // { algorithm: "RS256" },
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

const createSendToken = (user, res) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;
  res.status(200).json({ token });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (email) {
    return res
      .status(400)
      .json({ message: `User with email '${email}' already exist` });
  }
  const salt = bcrypt.genSaltSync(10);
  var hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.log("🚀 ~ exports.register= ~ error:", error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1) Check if the email and password exists
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter a email or password." });
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ where: { email: email } });
    // console.log("🚀 ~ exports.login= ~ user:", user);

    if (!user || (await !bcrypt.compareSync(password, user.password))) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }
    // 3) if everything is OK, send token to client
    createSendToken(user, res);

    // res.status(200).json({ msg: "login successful" });
  } catch (error) {
    console.log("🚀 ~ exports.login= ~ error:", error);
  }
};

exports.logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 10 * 1000),
  });

  res.status(200).json({ message: "success logout" });
};

exports.protect = async (req, res, next) => {
  // console.log("req.headers", req.headers);
  // console.log("req.cookies", req.cookies.jwt);
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new Error("You ate not logged in! Please try again"));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  console.log("🚀 ~ exports.protect= ~ decoded:", decoded);

  const currentUser = await User.findByPk(decoded.id);
  console.log("🚀 ~ exports.protect= ~ currentUser:", currentUser);

  if (!currentUser) {
    return new Error("The user belonging to this token does not longer exist");
  }
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
};
