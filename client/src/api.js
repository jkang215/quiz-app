import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');

function startQuiz(cb) {
  socket.on('quiz', quiz => cb(null, quiz));
  socket.emit('startQuiz', 1000);
}

export default { startQuiz };
