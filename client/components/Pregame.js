import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { setRoomThunk } from "../store";
import { CSSTransitionGroup } from "react-transition-group";
import socket from "../socket";
import history from "../history";

class Pregame extends Component {
  constructor() {
    super();
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
  }

  handleClick() {
    socket.emit('startGame');
  }

  render() {
    return (
      <div className="row">
        {(this.props.players.players[0].sessionId === this.props.players.player.sessionId) ?
          <button onClick={this.handleClick} className="btn btn-success">
            Start Da Game Bro
                </button>
          :
          <div>
            <h1>Please wait until host chooses to start the game</h1>
            <h3>Game Players: </h3>
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
        }
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
