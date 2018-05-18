import React from 'react';

const Lobby = (props) => {
  // Get other users from socket connection


  return (
    <div id="lobby">
      <ul>
        {userList}
      </ul>
      <button type="button" name="start-quiz" onClick={() => {props.showQuiz(); }}>Start Quiz</button>
    </div>
  );
};

export default Lobby;
