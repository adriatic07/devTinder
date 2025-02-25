const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validator = require("validator");
const { validateUserData } = require("../utils/validation");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      age,
      gender,
      emailId,
      password,
      about,
      photoURL,
      skills,
    } = req.body;
    //Validation of data
    validateUserData(req);

    //Encrypting the password
    const hashedPassowrd = await bcrypt.hash(password, 10); //10 refers to saltrounds(layering to password)

    //Creating a new instance of the user Model.
    const user = new User({
      firstName,
      lastName,
      age,
      gender,
      emailId,
      password: hashedPassowrd,
      about,
      photoURL,
      skills,
    });

    await user.save();
    res.send("User successfully added!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    //email validation logic
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid email!");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentails");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //Create a JWT Token
      const token = await user.getJWT();

      //Add the token to cookie and send the response back to user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login successful");
    } else {
      throw new Error("Invalid credentails");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("User logout successfully");
});

module.exports = authRouter;
