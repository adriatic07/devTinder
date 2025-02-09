const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isValid = token === "xyz";
  if (!isValid) res.send("You are not an admin, please login as an user!");
  else next();
};

const userAuth = (req, res, next) => {
  //user login
  console.log("Log In as an user!");
  next();
};

module.exports = {
  adminAuth,
  userAuth,
};
