const express = require("express");
const app = express();

app.use("/home", (req, res) => {
  res.send("Hello from the server!!");
}); //Request handler

app.use("/get", (req, res) => {
  res.send("This is the get request");
}); //get request

app.use("/post", (req, res) => {
  res.send("This is the post request");
}); //post request

app.use("/put", (req, res) => {
  console.log("This is the put resquest");
}); //put request

app.use("/patch", (req, res) => {
  console.log("This is the patch request");
}); //patch request

app.listen(3000, () => console.log("Listening on port 3000")); //Server is running on port 3000
