const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

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

app.get("/journals", (req, res) => {
  db.query("SELECT * FROM journal_log", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
