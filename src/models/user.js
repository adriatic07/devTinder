const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
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
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 20,
    },
    photoURL: {
      type: String,
      default:
        "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
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

module.exports = mongoose.model("User", userSchema);
