const express = require("express");
const { connectDb } = require("./config/Database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  //console.log(req.body);
  //Creating a new instance of the user Model.
  const data = req.body;
  const user = new User(req.body);
  //console.log(user);

  try {
    const ALLOWED_DATA = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "emailId",
      "password",
      "photoURL",
      "about",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_DATA.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Please enter correct details");
    }
    if (data?.skills.length > 10) {
      throw new Error("Upto 10 skills are allowed!");
    }
    await user.save();
    res.send("User successfully added!");
  } catch (err) {
    res.status(400).send("Error saving the user : " + err.message);
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
