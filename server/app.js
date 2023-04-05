const express = require("express");
const path = require("path");
const app = express();

// static middleware
app.use("/dist", express.static(path.join(__dirname, "../dist")));

app.use("/public", express.static("public"));

app.use(express.json());

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
