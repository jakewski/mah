import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import { setPlayerThunk } from '../store'
import socket from '../socket'

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
    this.props.setPlayerThunk({name: this.state.player.name, id: socket.id})
    this.props.history.push('/home')
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
        <div className="row">
          <CSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={2000} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
            <form key="transition" className="form-inline" onSubmit={this.formSubmit}>
              <h1 className="whatsYourName">Hello, what is your name?</h1>
              <br />
              <label className="sr-only" htmlFor="inlineFormInput">Name</label>
              <input value={this.state.playerName} onChange={(e) => this.updateField(e)} type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Jane Doe" />
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
