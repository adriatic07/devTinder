const express = require("express");
const { connectDb } = require("./config/Database");
const { validateUserData } = require("./utils/validation");
const validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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
    const isValidUser = await bcrypt.compare(password, user.password);
    if (isValidUser) {
      res.send("Login successful");
    } else {
      throw new Error("Invalid credentails");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//Get user by email
app.get("/user", async (req, res) => {
  try {
    const users = await User.find({ emailId: req.body.emailId });
    if (users.length === 0) {
      res.status(404).send("No user found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//Get Feed API - to feed all the user from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("No user found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//Delete an user by an id from database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send(user.firstName + " deleted successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//Update an user by an id
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_DATA = [
      "firstName",
      "lastName",
      "gender",
      "password",
      "photoURL",
      "about",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_DATA.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Upto 10 skills are allowed!");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "before",
      runValidators: true,
    });
    //console.log(user);
    res.send("User successfully updated!");
  } catch (err) {
    res.status(400).send("Update failed - " + err.message);
  }
});

connectDb()
  .then(() => {
    console.log("DB connection successfully established!!");
    app.listen(3000, () => console.log("Listening on port 3000")); //Server is running on port 3000
  })
  .catch((err) => {
    console.error(err);
  });
