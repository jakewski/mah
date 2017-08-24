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
