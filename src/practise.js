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

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("All data sent");
});

app.get("/getUserData", userAuth, (req, res) => {
  //logic to DB call and get the user data
  try {
    throw new Error("Code is breaked");
  } catch (err) {
    res.status(500).send("Unable to get the data due to some network issue");
  }
  //res.send("Sent all user data");
});

//This will only handle Get method to /user
app.get(
  "/user",
  (req, res, next) => {
    console.log("Handling route 1");
    next();
    //res.send({ firstName: "Aniket", lastName: "Jain" });
  },
  (req, res, next) => {
    console.log("Handling route 2");
    //res.send("2nd Response");
    next();
  }
);

//This will only handle Post method to /user
app.post("/user", (req, res) => {
  //logic to add data to DB
  res.send("Data successfully posted");
});

app.post("/item/:name/:id", (req, res) => {
  console.log(req.params);
  res.send("This is route testing");
}); //dynamic routes

app.post("/person", (req, res) => {
  console.log(req.query);
  res.send("This is route testing");
});

//this will match with all the HTTP method API call to /test
app.use("/test", (req, res) => {
  res.send("Hello from the server!!");
}); //Request handler

app.use("/", (err, req, res, next) => {
  if (err) res.status(500).send("Something went wrong!");
});
