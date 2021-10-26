const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

var userID = 0;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//creates cookie for Reminisk
app.use(
  session({
    key: "userID",
    secret: "thisNeedsToBeWayMoreComplicated",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60 * 60 * 24, //unit is milliseconds, cookie lasts for 24 hours
    },
  })
);

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
    "INSERT INTO journal_log(userlogin_id, journal_date, image, journal_entry) VALUES (?,?,?,?)",
    [userID, date, imgURL, journal],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("values Insert", res);
        // res.send("Values Inserted");
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
  db.query(
    "SELECT * FROM journal_log WHERE userlogin_id = ?",
    userID,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//server processes post request to insert user login credentials
app.post("/createUserCred", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO user_login (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("User credentials inserted");
        }
      }
    );
  });
});

//server processes login request
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM user_login WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (err, response) => {
          if (response) {
            req.session.user = result;
            userID = req.session.user[0].userlogin_id;
            console.log(req.session.user[0].userlogin_id);
            res.send(result);
          } else {
            res.send({ error: "Wrong password!" });
          }
        });
      } else {
        res.send({ error: "User doesn't exist!" });
      }
    }
  );
});

//server checks if user already logged in
app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ logIn: true, user: req.session.user });
  } else {
    res.send({ logIn: false });
  }
});

//server deletes session in database, logs user out
app.get("/logout", (req, res) => {
  req.session.destroy();
});

//local server at port 3001 listens to requests
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
