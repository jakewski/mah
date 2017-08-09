import React, { Component } from 'react';
import { connect } from 'react-redux';

class GameRoom extends Component {
  constructor(){
    super();
    this.state = {
      gameId: ''
    }
  }

  componentDidMount() {
    socket.on('getCode', (code) => {
      this.setState({gameId: code})
    })
  }

  render() {
    return (
      <div>
        <h1>Future Game Room</h1>
      </div>
    )
  }
}

const mapStateToProps = function(state, ownProps) {
  return {}
}

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom)
