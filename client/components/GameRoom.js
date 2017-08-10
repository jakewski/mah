import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import socket from '../socket'


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
      <CSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={2000} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
        <div key="transition" className="container">
          <h1>Future Game Room</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom)
