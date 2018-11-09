"use strict";

const express = require('express');
const nodemailer = require("nodemailer");
const app = express();

/*
  Here we are configuring our SMTP Server details.
  STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "nicholas.burnell92@gmail.com",
    pass: "njb12369874"
  }
});
/*------------------SMTP Over-----------------------------*/

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

/*------------------Routing Started ------------------------*/
app.get('/', function (req, res) {
  res.sendfile('index.html');
});
app.get('/send', function (req, res) {
  var mailOptions = {
    to: req.query.to,
    subject: req.query.subject,
    text: req.query.text
  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      res.end("error");
    } else {
      console.log("Message sent: " + response.message);
      res.end("sent");
    }
  });
});
/*--------------------Routing Over----------------------------*/

let port = 5050;
app.listen(port, () => console.log(`App is listening on port ${port}`));