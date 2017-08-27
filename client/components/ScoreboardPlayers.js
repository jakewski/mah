import React from 'react';
import socket from '../socket';
import { connect } from 'react-redux';

export default class ScoreboardPlayers extends React.Component {
  constructor() {
    super();
    this.state = {
      roundUnjudged: false,
    }
  }

  componentDidMount(){
    socket.on('gotAllAnswers', () => {
      this.setState({
        roundUnjudged: true
      })
    })
    socket.on('roundJudged', () => {
      this.setState({
        roundUnjudged: false,
      })
    })

  }

  componentWillUnmount(){
    socket.removeListener('roundJudged');
    socket.removeListener('gotAllAnswers');
  }

  render() {
    return (
      <div className="all-players-col wrap-at-580">
        <div className="players-scores-flexbox">
          {this.props.players.map((player, index) => {
            return (
              <div key={index}>
                {
                  this.props.judge.id === player.id
                  ? this.state.roundUnjudged
                    ? <div className="margin-right-1-resp">
                        <div className="scoreText blue name" key={index}>{player.name}: {player.score}</div>
                        <div className="loadingBlue right load"></div>
                      </div>
                    : <div className="scoreText blue margin-right-1-resp" key={index}>{player.name}: {player.score} ★</div>
                  : Object.keys(this.props.submittedAnswers).includes(player.sessionId) || this.props.timeout
                      //if answer submitted OR timeout
                      //if submitted
                     ? Object.keys(this.props.submittedAnswers).includes(player.sessionId) 
                        ?  <div className="scoreText green margin-right-1-resp" key={index}>{player.name}: {player.score} ✓</div>
                        :  <div className="scoreText grey name margin-right-1-resp" key={index}>{player.name}: {player.score} ✘</div>
                      : //waiting....
                        <div className="margin-right-1-resp">
                          <div className="scoreText red name" key={index}>{player.name}: {player.score} </div>
                          <div className="loadingRed right load"></div>
                        </div>
                }
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
