const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const profiles = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const passport = require("passport");
const app = express();
const path = require('path')
// EXPRESS BODY-PARSER
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// DB CONFIG
app.use((req, res, next) => {
  res.header({ 'Access-Control-Allow-Origin': '*' })
  res.header({ 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE' });
  res.header({ 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' })
  next();
});  
app.use(express.static(path.join(__dirname, "public")))
// Connect to the Mongo DB
DBURL = process.env.MONGODB_URI || "mongodb://localhost/developers_connect";
mongoose.connect(DBURL, (err) => {
  if (err) { console.log(err); return; }
  console.log("connected to MONGO");
})
let db = mongoose.connection;

db.on("error", function(error) {
console.log(" Error: ", error);
});

db.once("open", function() {
console.log(" connected.");
});

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
require("./config/passport")(passport);

// ROUTES SETUP
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profiles);
app.get('/',function(req, res) {
  res.sendFile(path.join(__dirname,"./client/build/index.html"));
});
// PORT SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
