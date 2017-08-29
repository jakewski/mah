import React from 'react';
import socket from '../socket';
import { connect } from 'react-redux';
import { ScoreboardPlayers } from '../components'

class GameRoomHeader extends React.Component {
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
        <div className="max-width-850 margin-top-3">
          <div className="category-timer-flexbox">
            <div className="col-sm round-category-div">
              <h2 className="round">ROUND {this.props.turnNumber + 1}:</h2>
              <h2 className="category">{this.props.category}</h2>
            </div>
            <div className="col timer-div">
              {
                this.props.currentTimer <= 10
                ? <h1 className="timer red">:{this.props.currentTimer || '0'}</h1>
                : <h1 className="timer">:{this.props.currentTimer || '0'}</h1>
              }
            </div>
            <ScoreboardPlayers players={this.props.players} judge={this.props.judge} timeout={this.props.timeout} submittedAnswers={this.props.submittedAnswers}/>
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

export default connect(mapStateToProps, null)(GameRoomHeader)
