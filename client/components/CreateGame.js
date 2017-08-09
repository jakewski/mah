import React, { Component } from 'react';
import { connect } from 'react-redux';

class CreateGame extends Component {
  constructor(){
    super();
  }

  componentDidMount() {
  }

  render() { 
    return (
      <div>
        <h1>In create a game</h1>
      </div>
    )
  }
}

const mapStateToProps = function(state, ownProps) {
  return {}
}

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame)