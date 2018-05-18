import React from 'react';

const Quiz = (props) => {
  const quizList = props.quiz;
  const question = props.question;

  const answerList = quizList[question].answers.map((q, i) => {
    <div key={i} className="radio">
      <label>
        <input className="answer" type="radio" name="answer" value={q}></input> {q}
      </label>
    </div>
  });

  return (
    <div id="question">
      <h2>{quizList[question].query}</h2>
      <form>
        {answerList}
      </form>
    </div>
  );
};

export default Quiz;
