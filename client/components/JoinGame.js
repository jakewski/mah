import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { setRoom } from "../store";
import { CSSTransitionGroup } from "react-transition-group";
import socket from "../socket";
import history from "../history";

class JoinGame extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      animateError: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    socket.on("wrongCode", errorMessage => {
      this.setState({ error: errorMessage, animateError: true, });
    });
    socket.on("alreadyInRoom", errorMessage => {
      this.setState({ error: errorMessage });
    });
  }

  handleSubmit(event) {
    event.persist();
    event.preventDefault();
    //console.log("player name submit: ", this.props.player.player);
    socket.emit("addPlayertoRoom", {
      code: event.target.code.value,
      playerName: this.props.players.player.name,
      sessionId: this.props.players.player.sessionId,
      activePlayer: this.props.players.player.activePlayer,
    });
    socket.on("correctRoom", host => {
      this.props.setRoom({id: event.target.code.value, host: host});
      history.push("/room");
    });
    this.setState({ animateError: false });
  }

  render() {
    return (
      <CSSTransitionGroup
        transitionName="fadeIn"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={0}
        transitionLeaveTimeout={0}
      >
        <div className="container joinRoom" key="transition">
          <div className="row">
          <h1>Join Game</h1>

          <form className="form-group" onSubmit={this.handleSubmit}>
            <div className="col">
              <label className="sr-only" htmlFor="inlineFormInput">
                Enter Room Code
              </label>
              <input
                type="text"
                name="code"
                className="form-control mb-2 mr-sm-2 mb-sm-0"
                id="inlineFormInput"
                placeholder="Enter Room Code"
              />
            </div>
            <button type="submit" className="btn btn-success">
              Join
            </button>
          </form>
        </div>
        </div>
        <h3 className={this.state.animateError ? "animated shake" : ""}>
          {this.state.error}
        </h3>
      </CSSTransitionGroup>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    players: state.players
  };
};

const mapDispatchToProps = dispatch => ({
  //will need to dispatch our game code for our player
  //need to have playername accessible for the handle submit
  setRoom: code => dispatch(setRoom(code))
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);
