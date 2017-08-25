import React from 'react';
import socket from '../socket';
import { connect } from 'react-redux';

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
      <div>
        <div className="row">
          <div className="row">
            <div className="round-timer-container">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 round-category-div">
                <h2 className="round">ROUND {this.props.turnNumber + 1}:</h2>
                <h2 className="category">{this.props.category}</h2>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 timer-div">
                <h1 className="timer">:{this.props.currentTimer || '0'}</h1>
              </div>
            </div>
          </div>
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
