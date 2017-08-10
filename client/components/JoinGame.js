import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

class JoinGame extends Component {
  constructor(){
    super();
  }

  componentDidMount() {

  }

  render() {
    return (
      <CSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={2000} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
        <div className="container" key="transition">
          <h1>Join Game</h1>

          <form className="form-group">

              <div className="col"></div>
              <div className="col">
                <label className="sr-only" htmlFor="inlineFormInput">Enter Room Code</label>
                <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Enter Room Code" />
              </div>
              <div className="col"></div>

              <br />
              <br />

              <NavLink to="/room"><button type="submit" className="btn btn-success">Join</button></NavLink>
            </form>
        </div>
      </CSSTransitionGroup>
    )
  }
}

const mapStateToProps = function(state, ownProps) {
  return {}
}

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame)
