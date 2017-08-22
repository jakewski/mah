import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Router} from 'react-router';
import {Route, Switch} from 'react-router-dom';
import history from './history';
import {Navbar, Home, GameRoom, CreateGame, JoinGame, EnterName, PlayerAnswering} from './components';
import axios from 'axios';
import { setPlayerThunk } from './store';
import socket from './socket'



/**
 * COMPONENT
 */
class Routes extends Component {
  constructor(){
    super()
  }

  componentWillMount() {
    axios.get('/api/player/')
    .then(res => {
      if(res.data.activePlayer) {
        this.props.setPlayerThunk({
          name: res.data.name,
          socketId: socket.id,
          activePlayer: res.data.activePlayer,
          sessionId: res.data.sessionId,
        })
      }
    })
  }

  render () {
    return (
      <Router history={history}>
       <div>
          { this.props.player.activePlayer ?
            <Switch>
              <Route path='/room' component={GameRoom} />
              <Route path='/create' component={CreateGame} />
              <Route path='/join' component={JoinGame} />
              <Route path='/temp' component={PlayerAnswering} />
              <Route path='/' component={Home} />
            </Switch>
           :
           //Routes below only available with no name
            <Route path='/' component={EnterName} />
          }
          <Navbar />
        </div>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = function(state, ownProps) {
  return {
    player: state.players.player
  }
}

const mapDispatchToProps = dispatch => ({
  setPlayerThunk: player => dispatch(setPlayerThunk(player)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
