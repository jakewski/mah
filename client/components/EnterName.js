import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import { setPlayerThunk } from '../store'
import socket from '../socket'
import axios from 'axios'

class EnterName extends Component {
  constructor(){
    super();
    this.state = {
      player: {name: '', dirty: false}
    }
    this.formSubmit = this.formSubmit.bind(this);
  }

  updateField(e) {
    this.setState({
      player: {name: e.target.value, dirty: true}
    })
  }

  formSubmit(e) {
    e.preventDefault();
    socket.emit('setPlayerName', this.state.player.name);
    axios.post('/api/player/', {
      name: this.state.player.name,
      socketId: socket.id,
    })
    .then(res => {
      this.props.setPlayerThunk({
        name: res.data.name,
        socketId: res.data.socketId,
        activePlayer: res.data.activePlayer,
        sessionId: res.data.sessionId,
      })
    })
    .then(() => {
      this.props.history.push('/')
    })
  }

  inputIsEmpty(){
    return this.state.player.name.length === 0;
  }

  inputWithinLimit(){
    return this.state.player.name.length <= 16
  }

  inputIsValid(){
    return !this.inputIsEmpty() && this.inputWithinLimit()
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="nameBanner"/>
        <div className="row">
          <CSSTransitionGroup transitionName="fadeIn" transitionAppear={true} transitionAppearTimeout={2000} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
            <form key="transition" className="form-inline" onSubmit={this.formSubmit}>
              <h1 className="whatsYourName">Hello, what is your name?</h1>
              <br />
              <label className="sr-only" htmlFor="inlineFormInput">Name</label>
              <input onChange={(e) => this.updateField(e)} type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Jane Doe" />
              <button type="submit" className="btn btn-success marginLeft" disabled={!this.inputIsValid()}>Enter</button>
              <br />
                {
                  this.inputIsEmpty() && this.state.player.dirty ?
                  <span className="alert alert-danger validationSpan">You must enter a name</span> :
                  null }
                {!this.inputWithinLimit() && this.state.player.dirty ?
                  <span className="alert alert-danger validationSpan">Name too long</span> :
                  null
                }
            </form>
          </CSSTransitionGroup>
      </div>
      </div>
    )
  }
}

const mapStateToProps = function(state, ownProps) {
  return {}
}

const mapDispatchToProps = dispatch => ({
  setPlayerThunk: player => dispatch(setPlayerThunk(player)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EnterName)
