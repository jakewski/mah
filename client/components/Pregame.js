import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { CSSTransitionGroup } from "react-transition-group";
import socket from "../socket";
import history from "../history";
import ChatBox from './ChatBox';

class Pregame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: this.props.room
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
  }

  handleClick() {
    socket.emit('startGame', this.props.players.room);
  }

  render() {
    return (
    <div className="container pregameCont">
      <div className="row">
        <h3 className="pgRoomCode">Room Code: {this.state.room} </h3>
      <div className="row startBtn">
        {(this.props.players.players[0].sessionId === this.props.players.player.sessionId) ?
          <button onClick={this.handleClick} className="btn">
            START
          </button>
          :
          <div>
            <h1>Please wait until host chooses to start the game</h1>
          </div>
        }
        </div>
        </div>
        <div className="row playersRow">
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 marginBottom">
        <h3 className="gamePlayers">Game Players: </h3>
        <h5>Host: {this.props.players.players[0].name}</h5>
        {
          this.props.players.players.map((player, index) => {
            if (!(index === 0)) {
              return (
                <div key={index} >Player {index + 1}: {player.name}</div>
              )
            }
          })
        }
        </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    players: state.players
  };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Pregame);
