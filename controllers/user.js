const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json(users);
  } catch (error) {
    console.log("🚀 ~ exports.getAllUsers= ~ error:", error);
  }
};
