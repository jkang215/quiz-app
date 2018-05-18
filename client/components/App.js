import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import SelectUser from './SelectUser';
import Lobby from './Lobby';
import Quiz from './Quiz';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = getInitialState();
  }

  getInitialState() {
    // Send a fetch to server to decide what state should be
    // Server response:
    // userID
    // lobbyID
    // quiz
    fetch(window.location.href)
      .then(response => response.json())
      .then(myJson => {
        this.setState({
          userID: myJson.userID,
          lobbyID: myJson.lobbyID,
          quiz: myJson.quiz,
          renderLobby: false,
          renderQuiz: false,
        });
      });
  }

  showLobby() {
    // Trigger state change to show lobby

  }

  showQuiz() {
    // Trigger state change to show quiz
    
  }

  render() {
    // Check if state is defined from getInitialState
    if (this.state) {
      // Conditional rendering
      if (this.state.renderLobby) {
        // Render the lobby component

      } else if (this.state.renderQuiz) {
        // Render quiz component

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