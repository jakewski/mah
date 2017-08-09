import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'

class JoinGame extends Component {
  constructor(){
    super();
  }

  componentDidMount() {
  }

  render() { 
    return (
      <div>
        <h1>Join Game</h1>
        <NavLink to="/room"><button type="button" className="btn btn-success btn-lg">Enter Game</button></NavLink>
      </div>
    )
  }
}

const mapStateToProps = function(state, ownProps) {
  return {}
}

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame)