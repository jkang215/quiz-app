import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import SelectUser from './SelectUser';
import Lobby from './Lobby';
import Quiz from './Quiz';
import Score from './Score';
import SelectQuiz from './SelectQuiz';
import startQuiz from './../src/api';

const url = 'http://localhost:3001/';
// const url = 'https://codesmith-quiz.herokuapp.com/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.showLobbyFromSelect = this.showLobbyFromSelect.bind(this);
    this.showLobbyFromScore = this.showLobbyFromScore.bind(this);
    this.showSelectQuiz = this.showSelectQuiz.bind(this);
    this.showQuiz = this.showQuiz.bind(this);
    this.socketLaunch = this.socketLaunch.bind(this);
  }

  getInitialState() {
    if (window.location.href.includes('/game/')) {
      const parseURL = window.location.href.split('/');
      return {
        userID: '',
        gameID: parseURL[parseURL.length - 1],
        quiz: [],
        renderSelectQuiz: false,
        renderLobby: false,
        renderQuiz: false,
        renderScore: false,
        question: 0,
        score: 0,
      };
    }
    return {
      userID: '',
      gameID: '',
      quiz: [],
      renderSelectQuiz: false,
      renderLobby: false,
      renderQuiz: false,
      renderScore: false,
      question: 0,
      score: 0,
    };
  }

  // Update state to launch quiz from socket connection
  socketLaunch() {
    startQuiz((err, quiz) => {
      this.setState({ quiz });
      this.showQuiz();
    });
  }

  showSelectQuiz() {
    const username = document.getElementById('select-field').value;
    // if (username) {
    //   fetch(`${url}user`, {
    //     body: JSON.stringify({ displayName: username }),
    //     credentials: 'include',
    //     headers: {
    //       'content-type': 'application/json',
    //     },
    //     method: 'POST',
    //   })
    //     .then(response => response.json())
    //     .then((myJson) => {
    //       const copy = Object.assign({}, this.state);
    //       copy.renderSelectQuiz = true;
    //       this.setState(copy);
    //     });
    // }
    fetch(`${url}quiz/0`, {
      credentials: 'include',
    })
      .then(response => response.json())
      .then((quiz) => {
        console.log(quiz);
        const copy = Object.assign({}, this.state);
        copy.quiz = quiz;
        this.setState(copy);
        this.showQuiz();
      });
  }

  // Trigger state change to show lobby after selecting a quiz
  showLobbyFromSelect() {
    if (this.state.gameID) {
      const copy = Object.assign({}, this.state);
      copy.renderLobby = true;
      copy.renderSelectQuiz = false;
      // Get request to get the quiz
      fetch(`${url}quiz/0`, {
        credentials: 'include',
      })
        .then(response => response.json())
        .then((quiz) => {
          copy.quiz = quiz;
          this.setState(copy);
        });
    } else {
      // Post request to change database with username
      fetch(`${url}game`, {
        body: JSON.stringify({ quizID: 0 }),
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
      })
        .then(response => response.json())
        .then((myJson) => {
          const copy = Object.assign({}, this.state);
          copy.gameID = myJson.id;
          copy.renderLobby = true;
          copy.renderSelectQuiz = false;
          // Get request to get the quiz
          fetch(`${url}quiz/0`, {
            credentials: 'include',
          })
            .then(response => response.json())
            .then((quiz) => {
              copy.quiz = quiz;
              this.setState(copy);
            });
        });
    }
  }

  // Trigger state change to show lobby from the score component after a game
  showLobbyFromScore() {
    const copy = Object.assign({}, this.state);
    copy.renderLobby = true;
    copy.renderQuiz = false;
    this.setState(copy);
  }

  // Trigger state change to show quiz
  showQuiz() {
    // this.socketLaunch();

    const copy = Object.assign({}, this.state);
    copy.renderLobby = false;
    copy.renderQuiz = true;
    copy.question = 0;
    this.setState(copy);
    const timer = setInterval(() => {
      console.log('state quiz length', this.state.quiz.length);
      console.log('state question', this.state.question);
      if (this.state.question === this.state.quiz.length - 1) {
        // Check answer
        const answers = document.querySelectorAll('.answer');
        let answered = -1;
        for (let i = 0; i < answers.length; i += 1) {
          if (answers[i].checked) answered = i;
        }
        // Render score page
        const copy = Object.assign({}, this.state);
        copy.renderQuiz = false;
        copy.renderScore = true;
        copy.question = 0;
        if (this.state.quiz[this.state.question].correct === answered) copy.score += 1;
        this.setState(copy);
        clearInterval(timer);
      } else {
        // Check answer
        const answers = document.querySelectorAll('.answer');
        let answered = -1;
        for (let i = 0; i < answers.length; i += 1) {
          if (answers[i].checked) answered = i;
        }
        // Render next question
        const copy2 = Object.assign({}, this.state);
        copy2.question += 1;
        if (this.state.quiz[this.state.question].correct === answered) copy2.score += 1;
        this.setState(copy2);
      }
    }, 10000);
  }

  render() {
    // Check if state is defined from getInitialState
    if (this.state) {
      // Conditional rendering
      if (this.state.renderLobby) {
        // Render the lobby component
        return <Lobby showQuiz={this.showQuiz} />;
      } else if (this.state.renderQuiz) {
        // Render quiz component
        return <Quiz quiz={this.state.quiz} question={this.state.question} />;
      } else if (this.state.renderScore) {
        // Render Score display component
        return (
          <Score
            score={this.state.score}
            showLobbyFromScore={this.showLobbyFromScore}
          />
        );
      } else if (this.state.renderSelectQuiz) {
        // Render SelectQuiz component
        return <SelectQuiz showLobbyFromSelect={this.showLobbyFromSelect} />;
      }
      // Render SelectUser component
      return <SelectUser showSelectQuiz={this.showSelectQuiz} />;
    }
    return <span>Loading...</span>;
  }
}

export default App;
