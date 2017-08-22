import React from 'react';
import socket from '../socket';

export default class Scoreboard extends React.Component {
  constructor() {
    super();
    this.state = {
      // turnNumber: 0,
      // gamePlayers: [],
      // allAnswersSubmitted: false,
      // timeout: false,
      // judge: {},
      //currentTimer: 0,
      //timer: '',
      roundUnjudged: false, 
    }
  }

  componentDidMount(){
    this.setState({
      //turnNumber: this.props.turnNumber,
      //gamePlayers: this.props.gamePlayers,
      //allAnswersSubmitted: this.props.allAnswersSubmitted,
      //timeout: this.props.timeout,
      //judge: this.props.judge,
      //currentTimer: 7000,
      roundUnjudged: false, 
    })


    socket.on('roundFinishedJudge', winningAnswer => {
      this.setState({
        roundUnjudged: true
      })
    })
  }

  componentWillUnmount(){
    //clearInterval(this.state.timer)
  }

  render(){
    return (
      <div>
        <div className="row">
          <div className="col-xs-6">
            <h5>Turn Number: {this.props.turnNumber}</h5>
          </div>
          <div className="col-xs-6">
            <h5>Timer: {this.props.currentTimer}</h5>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="playerScoreFlexBox">
            {this.props.gamePlayers.map((player, index) => {
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
        <hr />
      </div>
    )
  }
}
