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

//Configuring the API key
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("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");

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

app.get("/", (req, res, next)=>{
  res.render("index")
})

app.post("/send", (req, res, next) => {
  var allEmails = req.body.email.split(",");
  var emailContent = req.body.content;
  console.log(emailContent);
  
  const msg = {
    to: allEmails,
    from: "theodore.onyejiaku.g20@gmail.com", // Use the email address or domain you verified above
    subject: "This is from Theo and for testing",
    text: "and easy to do anywhere, even with Node.js",
    //html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    html: "<body>"
          +"<h1>Welcome to Testing Phase</h1>"  //Heading
          +" <div style='background-color:blue;padding:'>"+ emailContent +"</div>"  //Body
          +"<footer ></footer>"
          +"</body>"
  };

  //ES6
  sgMail.sendMultiple(msg).then(
    (resp) => {
      console.log(resp);
      res.end("Sent Successfully")
    },
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
      res.end("Not sent!")
    }
  );
});

//var mongoDB = "mongodb+srv://iceconnected:39913991@cluster0-kjwnq.mongodb.net/bank3?retryWrites=true&w=majority";
// var mongoDB = process.env.DB_LOCAL;
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// var db = mongoose.connections;
// db.concat("error", console.error.bind(console, "MongoDB connection error."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running succesfully on port:" + PORT);
});