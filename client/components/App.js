import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import SelectUser from './SelectUser';
import Lobby from './Lobby';
import Quiz from './Quiz';
import Score from './Score';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();
    this.showLobby = this.showLobby.bind(this);
    this.showQuiz = this.showQuiz.bind(this);
  }

  // Send a fetch to server to decide what state should be
  // Server response:
  // userID
  // lobbyID
  // quiz
  getInitialState() {
    fetch(url, {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(myJson => {
        this.setState({
          userID: myJson.userID,
          lobbyID: myJson.lobbyID,
          quiz: myJson.quiz,
          renderLobby: false,
          renderQuiz: false,
          renderScore: false,
          question: 0,
          score: 0,
        });
      });
  }

  // Update state to launch quiz from socket connection
  socketLaunch() {

    this.showQuiz();
  }

  // Trigger state change to show lobby
  showLobbyFromSelect() {
    fetch()
      .then(response => response.json())
      .then((myJson) => {
        const copy = Object.assign({}, this.state);
        copy.renderLobby = true;
        copy.renderQuiz = false;
        this.setState(copy);
      });
  }

  showLobbyFromScore() {
    const copy = Object.assign({}, this.state);
    copy.renderLobby = true;
    copy.renderQuiz = false;
    this.setState(copy);
  }

  // Trigger state change to show quiz
  showQuiz() {
    const copy = Object.assign({}, this.state);
    copy.renderLobby = false;
    copy.renderQuiz = true;
    copy.question = 0;
    this.setState(copy);
    let timer = setInterval(() => {
      if (this.state.question !== this.state.quiz.length - 1) {
        // Check answer
        let answers = document.querySelectorAll('.answer');
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
        let answers = document.querySelectorAll('.answer');
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
        return (
          <Lobby showQuiz={this.showQuiz} />
        );
      } else if (this.state.renderQuiz) {
        // Render quiz component
        return (
          <Quiz quiz={quiz} question={this.state.question} />
        );
      } else if (this.state.renderScore) {
        // Render Score display component
        return (
          <Score score={this.state.score} showLobby={this.showLobby} />
        );
      } else {
        // Render SelectUser component
        return (
          <SelectUser showLobby={this.showLobby} />
        );
      }
    } else {
      return (
        <span>Loading...</span>
      );
    }
  }
}