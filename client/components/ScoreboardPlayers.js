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
    socket.on('roundFinishedJudge', winningAnswer => {
      this.setState({
        roundUnjudged: true
      })
    })
  }

  componentWillUnmount(){
    //clearInterval(this.state.timer)
    socket.removeListener('roundFinishedJudge');
  }

  render() {
    return (
      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
        <div className="playerScoreFlexBox">
          {this.props.players.map((player, index) => {
            return (
              <div key={index}>
                {
                  this.props.judge.id === player.id ?
                    this.props.allAnswersSubmitted && !this.state.roundUnjudged ?
                      <div>
                        <div className="scoreText blue name" key={index}>{player.name}: {player.score} </div>
                        <div className="loadingBlue right load"></div>
                      </div>
                    :
                      <div>
                        <div className="scoreText blue" key={index}>{player.name}: {player.score} ★</div>
                      </div>
                  : Object.keys(this.props.submittedAnswers).includes(player.id) || this.props.timeout ?
                      //if answer submitted OR timeout
                      //if submitted
                      Object.keys(this.props.submittedAnswers).includes(player.id) ?
                          <div className="scoreText green" key={index}>{player.name}: {player.score} ✓</div>
                        : //if timeout
                          <div>
                            <div className="scoreText grey name" key={index}>{player.name}: {player.score} X</div>
                          </div>
                      : //waiting....
                        <div>
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
