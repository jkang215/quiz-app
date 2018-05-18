import React from 'react';

const SelectQuiz = (props) => {

  return (
    <form id="selectQuiz-form">
      <div className="form-group">
        <button className="btn btn-primary" onClick={() => props.showLobbyFromSelect()}>Quiz 1</button>
      </div>
    </form>
  );
};

export default SelectQuiz;
