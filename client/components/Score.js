import React from 'react';

const Score = (props) => {
  return (
    <div>
      <div className="score-container">
        <div className="score">{props.score[0].score}</div>
        <div className="score">{props.score[0].score}</div>
      </div>
    </div>
  )
};

export default Score;
