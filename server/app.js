var cookieMiddleware = require("./middleware/cookie");
var express = require("express");
var fs = require("fs");
var app = express();
var cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(cookieMiddleware);

// respond with "hello world" when a GET request is made to the homepage
// app.use((req, res) => {
//   console.log("Cookies: ", req.cookies);
//   res.cookie("userID", "someuserid");
// });

app.get("/", function(req, res) {
  res.send("hello world");
});

app.get("/get-state", function(req, res) {
  const state = {};
  const sampleQuiz = JSON.parse(
    fs.readFileSync("./server/model/quiz-demo.json", "utf-8")
  );

  state.quiz = sampleQuiz;
  res.json(sampleQuiz);
});

app.get("/game", function(req, res) {
  // res.send("hello world");
});

app.listen(3001);
