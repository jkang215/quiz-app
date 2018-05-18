// 3rd party modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const fs = require("fs");

// local imports
const cookieParser = require("cookie-parser");
const User = require("./model/users");

// local variables
const port = process.env.PORT || 3001;

// routers

app.use(cookieParser());
// app.use(cookieMiddleware);

app.get("/", function(req, res) {
  res.send("hello world!");
});

app.post("/user", jsonParser, User.createUser, (req, res) => {
  res.setHeader(`set-cookie`, `session=${res.locals.user.id}`);
  res.json(res.locals.user);
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
