import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import socket from '../socket';
import axios from 'axios';
import Instructions from './Instructions';
import { setPlayer } from '../store'

class EnterName extends Component {
  constructor(){
    super();
    this.state = {
      player: {name: '', dirty: false},
      showInstructions: true
    }
    this.formSubmit = this.formSubmit.bind(this);
    this.toggleInstructions = this.toggleInstructions.bind(this);
  }

  updateField(e) {
    this.setState({
      player: {name: e.target.value, dirty: true}
    })
  }

  toggleInstructions(){
    this.setState(prev => ({ showInstructions: !prev.showInstructions }));
  }

  formSubmit(e) {
    e.preventDefault();
    socket.emit('setPlayerName', this.state.player.name);
    axios.post('/api/player/', {
      name: this.state.player.name,
      socketId: socket.id,
    })
    .then(res => {
      return this.props.setPlayer({
        name: res.data.name,
        socketId: res.data.socketId,
        activePlayer: res.data.activePlayer,
        sessionId: res.data.sessionId,
      })
    })
    .then(() => {
      return this.props.history.push('/')
    })
    .catch(err => console.log(err))
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
      <div className="container form-container">

        <div className="row nameRow">
          <CSSTransitionGroup transitionName="fadeIn" transitionAppear={true} transitionAppearTimeout={2000} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
            <div className="vertical-center-container">
              <div className="flex-container flex-column flex-center">
                <form key="transition" className="form-inline" onSubmit={this.formSubmit}>
                  <h1 className="header hello black-on-white">H E L L O !</h1>
                  <br />
                  <label className="sr-only" htmlFor="inlineFormInput">Name</label>
                  <input onChange={(e) => this.updateField(e)} type="text" className="form-control mb-2 mr-sm-2 mb-sm-0 input" id="inlineFormInput" placeholder="What's your name?" />
                  <button type="submit" className="btn" disabled={!this.inputIsValid()}><i className="material-icons">subdirectory_arrow_left</i></button>
                  <br />
                    {
                      this.inputIsEmpty() && this.state.player.dirty ?
                      <span className="alert alert-danger validationSpan">You must enter a name</span> :
                      <span className="validationSpan"></span> }
                    {!this.inputWithinLimit() && this.state.player.dirty ?
                      <span className="validationSpan">Name too long</span> :
                      <span className="validationSpan"></span>
                    }
                </form>
              </div>
            </div>

            {/* <div className="row insRow">
        <button type="button" onClick={this.toggleInstructions}
          className="btn btn-info">
          {this.state.showInstructions ? 'Hide Instructions' : 'How to Play'}
        </button>
      </div> */}
      <div className="col-sm-12 col-md-12 col-lg-12 marginTop">
        {/*<Instructions showInstructions={this.state.showInstructions} />*/}
      </div>
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
  setPlayer: code => dispatch(setPlayer(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EnterName)
