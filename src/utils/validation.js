const validator = require("validator");

const validateUserData = (req) => {
  const { firstName, lastName, age, emailId, password, skills } = req.body;
  if (!firstName) {
    throw new Error("Firstname can't be empty!");
  }
  if (!lastName) {
    throw new Error("Lastname can't be empty!");
  }
  if (!age) {
    throw new Error("Age can't be empty!");
  }
  if (!emailId) {
    throw new Error("Email can't be empty!");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email!");
  }
  if (!password) {
    throw new Error("Password can't be empty!");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password!");
  }
  if (password.length > 20) {
    throw new Error("Password can't be 20 characters long!");
  }
  if (skills?.length > 10) {
    throw new Error("Upto 10 skills are allowed!");
  }
};

module.exports = {
  validateUserData,
};
