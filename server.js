const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const http = require("http");
const anime = require("./anime.json");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

let animes = fs.readFileSync("anime.json");
let obj = JSON.parse(animes);
console.log(obj)
app.get("/", (req, res) => res.sendFile(`${__dirname}/home.html`));

app.get("/form", (req, res) => res.sendFile(`${__dirname}/form.html`));

app.post("/form", (req, res) => {
 // let data = JSON.stringify(req.body);
 // console.log(data);
  res.sendFile(`${__dirname}/thankyou.html`);
  anime.push(req.body)
  fs.writeFileSync("anime.json", JSON.stringify(anime, null,4), (err) => {
    // Error checking
    if (err) throw err;
    console.log("New data added");
  });
});

app.get("/anime", (req, res) => res.sendFile(`${__dirname}/anime.json`));

app.listen(8000, function () {
  console.log("Server is running on localhost:8000 better catch it!");
});
