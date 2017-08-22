import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import { setPlayerThunk } from '../store';
import socket from '../socket';
import axios from 'axios';
import Instructions from './Instructions';

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
      <div className="container form-container">

        <div className="row bannerRow">
          <svg className="entryBanner" height="600px" id="Layer_1" width="1600px"
            version="1.1" viewBox="0 0 1600 600" x="0px" y="0px" xmlSpace="preserve">
            <rect height="281.575" width="1115.393" fill="none" x="270.491" y="94.25"/>
            <text fill="#FFFFFF" fontFamily="'Lobster'" fontSize="400"
            transform="matrix(1 0 0 1 270.4912 374.3281)">memes</text>
            <polygon fill="#FF9933" points="1562.822,493.383 816.499,493.383 70.175,493.383 70.175,300 70.175,106.618 816.499,106.618&#xA;     1562.822,106.618 1442.822,300 "/>
            <rect height="281.575" width="1115.393" fill="none" x="279.492" y="85.755"/>
            <text fill="#FFFFFF" fontFamily="'Lobster'" fontSize="400" transform="matrix(1 0 0 1 279.4922 365.833)">memes</text>
            <rect height="281.575" width="1115.393" fill="none" x="271.491" y="79.753"/>
            <text fill="#319999" fontFamily="'Lobster'" fontSize="400" transform="matrix(1 0 0 1 271.4912 359.8311)">memes</text>
            <rect height="96.126" width="1012.075" fill="none" x="286.491" y="375.825"/>
            <text className="heeboFont" fontWeight="900" fill="#CC3232" fontFamily="'Heebo'" fontSize="100" transform="matrix(1 0 0 1 286.4912 450.8252)">AGAINST HUMANITY</text>
          </svg>
        </div>

        <div className="row explanation">
          <h1>Think you're clever?</h1>
          <br />
          <p>sdjfisdlfjsdkfjskdlfjsdklfjsdklfjsdfljadflkdfjsklfjskfjdskfdskfsdkfdskfjdsfkjsdfkdjfksdjfkdsfjsdkjlfhugyftghjknlmjuhigyftdrfgbhnjkmljnbhv</p>
        </div>

        <div className="row nameRow">
          <CSSTransitionGroup transitionName="fadeIn" transitionAppear={true} transitionAppearTimeout={2000} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
            <div className="flexForm">

            <form key="transition" className="form-inline" onSubmit={this.formSubmit}>
              <h1>Get Started!</h1>
              <h4 className="whatsYourName">What is your name?</h4>
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
            </div>

            {/* <div className="row insRow">
        <button type="button" onClick={this.toggleInstructions}
          className="btn btn-info">
          {this.state.showInstructions ? 'Hide Instructions' : 'How to Play'}
        </button>
      </div> */}
      <div className="col-sm-12 col-md-12 col-lg-12 marginTop">
        <Instructions showInstructions={this.state.showInstructions} />
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
  setPlayerThunk: player => dispatch(setPlayerThunk(player)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EnterName)
