// 3rd party modules
const app = require("express")();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const fs = require("fs");

// local imports
const cookieParser = require("cookie-parser");
const User = require("./model/users");
const Game = require("./model/game");

// local variables
const port = process.env.PORT || 3001;

// routers

app.use(cookieParser());

app.get("/", function(req, res) {
  res.send("hello world!");
});

app.get("/quiz/0", function(req, res) {
  const sampleQuiz = JSON.parse(
    fs.readFileSync("./server/model/quiz-demo.json", "utf-8")
  );

  res.json(sampleQuiz);
});

app.post("/user", jsonParser, User.createUser, (req, res) => {
  res.setHeader(`set-cookie`, `session=${res.locals.user.id}`);
  res.json(res.locals.user);
});

io.on("connection", function(socket) {
  console.log("a user connected");
});

server.listen(port, () => {
  console.log(`listening on PORT:${port}…`);
});

// app.get("/get-state", function(req, res) {
//   const state = {};
//
// });
