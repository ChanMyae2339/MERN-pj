const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

userSchema.statics.userCreate = async function (email, name, password) {

  const genSalt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, genSalt);

  const userInfo = await this.create({
    name,
    email,
    password: hashedPassword,
  });
  return userInfo;
};

userSchema.statics.userLogin = async function (email, password) {
  const user = await this.findOne({ email });
      if (!user) {
        throw new Error("Invalid email");
      }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return user;
};


module.exports = mongoose.model("Users", userSchema);
