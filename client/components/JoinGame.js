import React, { Component } from 'react';
import { connect } from 'react-redux';

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