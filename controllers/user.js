const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json(users);
  } catch (error) {
    console.log("🚀 ~ exports.getAllUsers= ~ error:", error);
  }
};

exports.getUser = async (req, res) => {
  console.log(req.params);
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    console.log("🚀 ~ exports.getUser= ~ user:", user);
    user.password = undefined;
    res.status(200).json(user);
  } catch (error) {
    console.log("🚀 ~ exports.getUser= ~ error:", error);
  }
};
