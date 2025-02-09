const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: String, // String is shorthand for {type: String}
  age: Number,
  gender: String,
  emailId: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
