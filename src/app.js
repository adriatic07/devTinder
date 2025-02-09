const express = require("express");
const { connectDb } = require("./config/Database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Vishal",
    lastName: "Jain",
    age: 26,
    gender: "Male",
    emailId: "Vishal@jain.com",
    password: "vishal@123",
  });

  await user.save();

  res.send("User successfully added!");
});

connectDb()
  .then(() => {
    console.log("DB connection successfully established!!");
    app.listen(3000, () => console.log("Listening on port 3000")); //Server is running on port 3000
  })
  .catch((err) => {
    console.error(err);
  });
