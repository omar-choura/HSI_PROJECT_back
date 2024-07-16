const express = require("express");
const cors = require("cors"); // Add this line
const app = express();
require("dotenv").config();
const sql = require("./services/db").sql;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors()); // Add this line to enable CORS for all routes

// Connection to our database
sql();

const referenceRoute = require("./controller/reference.controller");
app.use("/reference", referenceRoute);

app.get('/', (req, res) => {
  res.send(`<h1 style="color:Tomato;">Hello</h1><h2>by</h2>`);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("You are running at port ", port);
});
