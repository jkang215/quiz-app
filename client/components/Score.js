import React from 'react';

const Score = (props) => {
  // TODO: get all user scores from server

  return (
    <div>
      <div className="score-container">
        <h4>Your Score:</h4>
        <div className="score">{props.score}</div>
      </div>
    </div>
  )
};

export default Score;
