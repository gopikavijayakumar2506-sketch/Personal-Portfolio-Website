const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "portfolio_user",
    password: "Portfolio@123",
    database: "portfolio"
});

db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed");
        console.log(err);
    } else {
        console.log("MySQL Connected Successfully");
    }
});

app.get("/", (req, res) => {
    res.send("Portfolio Backend Running");
});

app.get("/projects", (req, res) => {
    db.query("SELECT * FROM projects", (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});