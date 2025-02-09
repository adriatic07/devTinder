const express = require("express");
const { connectDb } = require("./config/Database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  //console.log(req.body);
  //Creating a new instance of the user Model.
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User successfully added!");
  } catch (err) {
    res.status(400).send("Error svaing the user : " + err.messgae);
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
