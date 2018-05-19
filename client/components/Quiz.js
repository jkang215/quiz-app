import React from 'react';

const Quiz = (props) => {
  const quizList = props.quiz;
  const question = props.question;

  const answerList = quizList[question].answers.map((q, i) => (
    <div key={i} className="radio">
      <label>
        <input className="answer" type="radio" name="answer" value={q}></input> {q}
      </label>
    </div>
  ));

  const source = 'https://timertopia.files.wordpress.com/2017/04/10-seconds.gif?a=' + Math.random();
  const gif = <img alt={question} src={source} />;

  return (
    <div id="question">
      <h2>{quizList[question].query}</h2>
      <form>
        {answerList}
      </form>
      {gif}
    </div>
  );
};

export default Quiz;
