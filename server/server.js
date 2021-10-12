const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "admin",
  host: "database-1.cjiqxzmwoa9k.us-east-2.rds.amazonaws.com",
  password: "classic1",
  database: "reminisk",
});

//server processes post request to insert user information
app.post("/createUserInfo", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  db.query(
    "INSERT INTO user_info (name, email) VALUES (?,?)",
    [name, email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("User information inserted");
      }
    }
  );
});

//server processes post request to update user information
app.post
(
  "/updateUserInfo", (req, res) => 
  {
    const name = req.body.name;
    const email = req.body.email;

    db.query
    (
      "UPDATE user_info SET name = ? WHERE email = ?", [name, email],
      (err, result) =>
      {
        if(err) 
        {
          console.log(err)
        }
        else
        {
          res.send(result);
        }
      }
    );
  }
);

//server processes post request to insert user login credentials
app.post("/createUserCred", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "INSERT INTO user_login (username, password) VALUES (?,?)",
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("User credentials inserted");
      }
    }
  );
});

//local server at port 3001 listens to requests
app.listen(3001, () => {
  console.log("port 3001 is running");
});
