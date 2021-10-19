const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const jwt = require("jsonwebtoken");

const db = mysql.createConnection({
  host: "database-1.cjiqxzmwoa9k.us-east-2.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  password: "classic1",
  database: "reminisk",
});

db.connect((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log("Database connected.");
});

// Uploads journal Entries
app.post("/upload", (req, res) => {
  const date = req.body.date;
  const journal = req.body.journal;
  const imgURL = req.body.imgURL;

  db.query(
    "INSERT INTO journal_log(journal_date, image, journal_entry) VALUES (?,?,?)",
    [date, imgURL, journal],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
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

//server processes put request to update user information
app.put("/updateUserInfo", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  db.query(
    "UPDATE user_info SET name = ? WHERE email = ?",
    [name, email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//server processes delete request to delete user
app.delete("/delete/:userinfo_id", (req, res) => {
  const userinfo_id = req.params.userinfo_id;

  db.query(
    "DELETE FROM user_info WHERE userinfo_id = ?",
    userinfo_id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Gets journal entries
app.get("/journals", (req, res) => {
  db.query("SELECT * FROM journal_log", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

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

//server processes login request
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM user_login WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ error: "Wrong username/password combination!" });
      }
    }
  );
});

//local server at port 3001 listens to requests
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
