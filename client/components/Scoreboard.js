import React from 'react';
import socket from '../socket';
import { connect } from 'react-redux';
import { ScoreboardHeader} from '../components'

class Scoreboard extends React.Component {
  constructor() {
    super();
    this.state = {
      roundUnjudged: false,
    }
  }

  componentDidMount(){
    socket.on('roundFinishedJudge', winningAnswer => {
      this.setState({
        roundUnjudged: true,
        timeout: false,
        currentTimer: 0,
      })
    })

    socket.on('setTimer', timer => {
      this.setState({ currentTimer: timer }) 
    })
  }

  componentWillUnmount(){
    //clearInterval(this.state.timer)
    socket.removeListener('roundFinishedJudge');
    socket.removeListener('setTimer');

  }

  render(){
    return (
      <div>
        <div className="row">
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
                    : (this.props.submittedAnswers && Object.keys(this.props.submittedAnswers).includes(player.id)) || this.state.timeout ?
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
          <ScoreboardHeader turnNumber={this.props.turnNumber} category={this.props.category} currentTimer={this.props.currentTimer}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    players: state.players.players
  }
}

export default connect(mapStateToProps, null)(Scoreboard)
