const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const createToken = require("../jwt/CreateToken");
const UserController = {
  register: async (req, res) => {
    const { name, email, password } = req.body;
    const userInfo = await Users.userCreate(email, name, password);
    const token = createToken({ id: userInfo._id });
    return res
      .status(200)
      .json({ msg: "user created successfully", userInfo, token })
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 5 * 1000, // 5 days in milliseconds
      });
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
    const userInfo = await Users.userLogin(email, password);
    const token = createToken({ id: userInfo._id });
    return res.cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 5 * 1000, // 5 days in milliseconds
       
      })
      .json({ msg: "login is successful", userInfo, token })
    ;
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(401).json({ errors: error.message });
  }
  }
};

module.exports = UserController;
