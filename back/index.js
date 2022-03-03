var express = require("express");
var apiServer = express();
var cors = require("cors");
apiServer.use(cors());
var fs = require("fs");
const { stringify } = require("querystring");
const mysql = require('mysql2');
const { throws } = require("assert");

var host = "localhost";
var port = 3000;

apiServer.listen(port, host, () => {
  console.log("Server partito: http://%s:%d/", host, port);
});

var con = mysql.createConnection({
  host: "http://martoccia.lorenzo.tave.osdb.it/",
  user: "c183_tecnologia",
  password: "Az-80771",
  database: "",
});

con.connect(function(err){
  if(err){
    throw err;
  } else {
    console.log("sei connesso")
  }
});

login = function (email, password, callback) {
  var query = "SELECT * FROM `Node_js` WHERE email ='"+email+ "' AND password ='"+password+ "'";
  con.query(query, callback);
};

signUp= function (email, password, callback) {
  var query =
    "INSERT INTO `Node_js`(`email`,`password`) values ('" +
    email +
    "','" +
    password +
    "')";
  con.query(query,callback);
};

apiServer.get("/api/login", (req, res) => {
  console.log("ricevuti:", req.query.mail, req.query.password);
  login(req.query.mail, req.query.password,function(err,results){
      if (results.length > 0) {
          console.log("ok");
          res.status(200).json({ message: "login effettuato" });
          login = true;
      } else {
          response.send("Incorrect username / password");
          if (!login) res.status(400).json({ message: "Incorrect username / password" });
      }
  });
});

apiServer.get("/api/register", (req, res) => {
  var email =  req.query.mail;
  var password =  req.query.password;
  console.log("ricevuti:", email, password);
  signUp(email, password, function(err,results){
      if (err) res.status(400).json({ message: "sign-up failed" });
      else res.status(200).json({ message: "sign-up success" });
  });
}); 
