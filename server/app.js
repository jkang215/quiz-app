// 3rd party modules
const express = require("express");
const app = express();
const fs = require("fs");

// local imports
const cookieMiddleware = require("./middleware/cookie");
const cookieParser = require("cookie-parser");

// local variables
const port = process.env.PORT || 3001;

// routers

app.use(cookieParser());
app.use(cookieMiddleware);

app.get("/", function(req, res) {
  res.send("hello world!");
});

app.get("/get-state", function(req, res) {
  const state = {};
  const sampleQuiz = JSON.parse(
    fs.readFileSync("./server/model/quiz-demo.json", "utf-8")
  );

  state.quiz = sampleQuiz;
  res.json(sampleQuiz);
});

app.listen(port);
