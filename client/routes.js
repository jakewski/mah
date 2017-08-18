import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Router} from 'react-router';
import {Route, Switch} from 'react-router-dom';
import history from './history';
import {Navbar, Home, GameRoom, CreateGame, JoinGame, EnterName, PlayerAnswering} from './components';
import axios from 'axios';
import { setPlayerThunk, setRoom, replacePlayers } from './store';
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
      if (res.data.activePlayer) {
        this.props.setPlayerThunk({
          name: res.data.name,
          socketId: socket.id,
          activePlayer: res.data.activePlayer,
          sessionId: res.data.sessionId,
        })
      }
    })
    axios.get('/api/room')
    .then( res => {
      if (res.data.activeRoom) {
        this.props.setRoom({id: res.data.room})
      }
      socket.emit('getPlayers', res.data.room)
      socket.on('recievePlayers', players => {
        this.props.replacePlayers(players)
      })
    })
    // .then(room => {
    //   axios.post('/api/room/players', {room})
    //   .then( res => {
    //     if (res.data.players !== null) {
    //       this.props.replacePlayers(res.data.players)}
    //   })
    // })

  }

  render () {
    return (
      <Router history={history}>
        <Navbar>
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
        </Navbar>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = function(state, ownProps) {
  return {
    player: state.players.player,
    players: state.players,
  }
}

const mapDispatchToProps = dispatch => ({
  setPlayerThunk: player => dispatch(setPlayerThunk(player)),
  setRoom: room => dispatch(setRoom(room)),
  replacePlayers: players => dispatch(replacePlayers(players)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
