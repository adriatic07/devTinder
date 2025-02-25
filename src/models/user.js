const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    lastName: {
      type: String,
      minLength: 1,
      maxLength: 100,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    gender: {
      type: String,
      lowercase: true,
      validate(value) {
        //custom validate function
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("enter the correct gender - male, female, others!");
        }
      },
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxLength: 100,
      //match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email id!");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 70,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Not a strong passowrd!");
        }
      },
    },
    photoURL: {
      type: String,
      default:
        "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo url!");
        }
      },
    },
    about: {
      type: String,
      default: "This is the default about of the user.",
      minLength: 1,
      maxLength: 500,
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "dev@tinder$1407", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (userEnteredPassword) {
  const user = this;
  const hashedPassowrd = user.password;
  const isPasswordValid = await bcrypt.compare(
    userEnteredPassword,
    hashedPassowrd
  );
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
