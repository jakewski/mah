import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Router} from 'react-router';
import {Route, Switch} from 'react-router-dom';
import history from './history';
import {Navbar, Home, GameRoom, CreateGame, JoinGame, EnterName, PlayerAnswering, Contact, Footer} from './components';
import axios from 'axios';
import { setPlayer, setRoom, replacePlayers } from './store';
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
        return this.props.setPlayer({
          name: res.data.name,
          socketId: socket.id,
          activePlayer: res.data.activePlayer,
          sessionId: res.data.sessionId,
        })
      }
    })
    .catch(err => console.log(err))
  }

  render () {
    return (
      <Router history={history}>
       <div>
        <Navbar />
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
           <div>     
            <Switch>
              <Route path='/contact' component={Contact} />
              <Route path='/' component={EnterName} />
            </Switch>
            <Footer history={history} />
          </div>
          }
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
    player: state.players.player,
    players: state.players,
  }
}

const mapDispatchToProps = dispatch => ({
  setPlayer: player => dispatch(setPlayer(player)),
  setRoom: room => dispatch(setRoom(room)),
  replacePlayers: players => dispatch(replacePlayers(players)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
