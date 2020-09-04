const express = require("express");
const app = express();
const request = require("request");
const path = require("path");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

//configuring dotenv
require("dotenv").config();
//Importing the body-parser middle ware
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());
app.use(cors());
//Use of cookies
app.use(cookieParser());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.post("/send", (req, res, next) => {
  var unirest = require("unirest");

  var req = unirest(
    "POST",
    "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send"
  );

  req.headers({
    "x-rapidapi-host": "rapidprod-sendgrid-v1.p.rapidapi.com",
    "x-rapidapi-key": "SIGN-UP-FOR-KEY",
    "content-type": "application/json",
    accept: "application/json",
    useQueryString: true,
  });

  req.type("json");
  req.send({
    personalizations: [
      {
        to: [
          {
            email: "theodoreonyejiaku@yahoo.com",
          },
        ],
        subject: "Hello, World!",
      },
    ],
    from: {
      email: "from_address@example.com",
    },
    content: [
      {
        type: "text/plain",
        value: "Hello, World!",
      },
    ],
  });

  req.end(function (res) {
    if (res.error) throw new Error(res.error);

    console.log(res.body);
  });
});

//var mongoDB = "mongodb+srv://iceconnected:39913991@cluster0-kjwnq.mongodb.net/bank3?retryWrites=true&w=majority";
var mongoDB = process.env.DB_LOCAL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connections;
db.concat("error", console.error.bind(console, "MongoDB connection error."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running succesfully on port:" + PORT);
});
