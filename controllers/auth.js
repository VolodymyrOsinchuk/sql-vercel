const User = require("../models/user");

exports.register = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json(newUser);
  } catch (error) {
    console.log("🚀 ~ exports.register= ~ error:", error);
  }
};

exports.login = async (req, res) => {
  try {
    res.status(200).json({ msg: "login successful" });
  } catch (error) {
    console.log("🚀 ~ exports.login= ~ error:", error);
  }
};
