const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const sql = require("./services/db").sql;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS

// Connection to the database
sql();

app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));
const referenceRoute = require("./controller/reference.controller");
app.use("/reference", referenceRoute);

// Serve static files from 'frontImages'
app.use('/photos', express.static(path.join('C:/Users/USER/Desktop/frontImages')));

app.get('/', (req, res) => {
  res.send(`<h1 style="color:Tomato;">Hello</h1><h2>by</h2>`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("You are running at port ", port);
});
