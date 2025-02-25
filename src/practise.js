// app.use("/get", (req, res) => {
//   res.send("This is the get request");
// }); //get request

// app.use("/post", (req, res) => {
//   res.send("This is the post request");
// }); //post request

// app.use("/put", (req, res) => {
//   console.log("This is the put resquest");
// }); //put request

// app.use("/patch", (req, res) => {
//   console.log("This is the patch request");
// }); //patch request

// app.use("/route", rh1, rh2, rh3, rh4)
// or
// app.use("/route", [rh1, rh2, rh3, rh4])
// or
// app.use("/route",[rh1,rh2],rh3,rh4)
// these all above are one and the same thing, we can have multiple route handlers with one route

// app.use("/admin", adminAuth);

// app.get("/admin/getAllData", (req, res) => {
//   res.send("All data sent");
// });

// app.get("/getUserData", userAuth, (req, res) => {
//   //logic to DB call and get the user data
//   try {
//     throw new Error("Code is breaked");
//   } catch (err) {
//     res.status(500).send("Unable to get the data due to some network issue");
//   }
//   //res.send("Sent all user data");
// });

// //This will only handle Get method to /user
// app.get(
//   "/user",
//   (req, res, next) => {
//     console.log("Handling route 1");
//     next();
//     //res.send({ firstName: "Aniket", lastName: "Jain" });
//   },
//   (req, res, next) => {
//     console.log("Handling route 2");
//     //res.send("2nd Response");
//     next();
//   }
// );

// //This will only handle Post method to /user
// app.post("/user", (req, res) => {
//   //logic to add data to DB
//   res.send("Data successfully posted");
// });

// app.post("/item/:name/:id", (req, res) => {
//   console.log(req.params);
//   res.send("This is route testing");
// }); //dynamic routes

// app.post("/person", (req, res) => {
//   console.log(req.query);
//   res.send("This is route testing");
// });

// //this will match with all the HTTP method API call to /test
// app.use("/test", (req, res) => {
//   res.send("Hello from the server!!");
// }); //Request handler

// app.use("/", (err, req, res, next) => {
//   if (err) res.status(500).send("Something went wrong!");
// });

// //Get user by email
// app.get("/user", async (req, res) => {
//   try {
//     const users = await User.find({ emailId: req.body.emailId });
//     if (users.length === 0) {
//       res.status(404).send("No user found");
//     } else {
//       res.send(users);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// //Get Feed API - to feed all the user from the database
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     if (users.length === 0) {
//       res.status(404).send("No user found");
//     } else {
//       res.send(users);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// //Delete an user by an id from database
// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     const user = await User.findByIdAndDelete(userId);
//     res.send(user.firstName + " deleted successfully!");
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// //Update an user by an id
// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;
//   try {
//     const ALLOWED_DATA = [
//       "firstName",
//       "lastName",
//       "gender",
//       "password",
//       "photoURL",
//       "about",
//       "skills",
//     ];
//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       ALLOWED_DATA.includes(k)
//     );
//     if (!isUpdateAllowed) {
//       throw new Error("Update not allowed");
//     }
//     if (data?.skills.length > 10) {
//       throw new Error("Upto 10 skills are allowed!");
//     }
//     const user = await User.findByIdAndUpdate(userId, data, {
//       returnDocument: "before",
//       runValidators: true,
//     });
//     //console.log(user);
//     res.send("User successfully updated!");
//   } catch (err) {
//     res.status(400).send("Update failed - " + err.message);
//   }
// });
