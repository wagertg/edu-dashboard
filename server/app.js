const express = require("express");
const path = require("path");
const app = express();

// Serve static files. Express looks up the files relative to the static directory

app.use("/dist", express.static(path.join(__dirname, "../dist")));

app.use("/public", express.static("public"));

// The  middleware function parses incoming requests with JSON payloads.

app.use(express.json());

// Middleware to handle errors. It logs the error and sends it back to the client with a 500 status code.

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

// Define the route handler for the default home page.
// It sends the 'index.html' file back to the client when the home route is hit.

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
