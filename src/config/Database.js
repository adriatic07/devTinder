const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://aniket:jhZtPv3whOveZelW@nodejs.frq6p.mongodb.net/devTinder",
    { family: 4 }
  );
};

module.exports = {
  connectDb,
};
