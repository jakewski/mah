import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import socket from '../socket'

class JoinGame extends Component {
  constructor(){
    super();
    this.state = {
      error: ''
    }
  }

  componentDidMount() {
    socket.on('wrongCode', errorMessage => {
      this.setState({ error: errorMessage })
    })
    socket.on('alreadyInRoom', errorMessage => {
      this.setState({ error: errorMessage })
    })

  }

  render() {
    return (
      <CSSTransitionGroup transitionName="fadeIn" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
        <div className="container" key="transition">
          <h1>Join Game</h1>

          <form className="form-group" onSubmit={this.props.handleSubmit}>

              <div className="col"></div>
              <div className="col">
                <label className="sr-only" htmlFor="inlineFormInput">Enter Room Code</label>
                <input type="text" name="code" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Enter Room Code" />
              </div>
              <div className="col"></div>

              <br />
              <br />

              <button type="submit" className="btn btn-success">Join</button>
            </form>
        </div>
        <div>{this.state.error}</div>
      </CSSTransitionGroup>
    )
  }
}

const mapStateToProps = function(state, ownProps) {
  return {}
}

const mapDispatchToProps = dispatch => ({
  //will need to dispatch our game code for our player
  //need to have playername accessible for the handle submit
  handleSubmit: event => {
    event.preventDefault();
    socket.emit('addPlayertoRoom', {
     code: event.target.code.value,
     //playerName: 
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame)
