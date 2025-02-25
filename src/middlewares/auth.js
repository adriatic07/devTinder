const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    //Read the token from req cookies
    const cookies = req.cookies;
    const { token } = cookies;
    //Validate the token
    if (!token) {
      throw new Error("Invalid Token");
    }
    const decodedObj = await jwt.verify(token, "dev@tinder$1407");
    const { _id } = decodedObj;
    //find the user
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User does not exist");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
};
module.exports = {
  userAuth,
};
