import React from 'react';

const Score = (props) => {
  return (
    <div>
      <div className="score-container">
        <div className="score">{props.score}</div>
        <div className="score">{props.score}</div>
      </div>
    </div>
  )
};

export default Score;
