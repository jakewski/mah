import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import history from './history'
import {Navbar, Home, GameRoom, CreateGame, JoinGame, EnterName} from './components'
import axios from 'axios'

/**
 * COMPONENT
 */
class Routes extends Component {

  componentDidMount() {
    axios.get('/api/player/check')
    .then(res => {
      console.log('activeplayer? ', res.data)
    })
  }

  render () {
    return (
      <Router history={history}>
        <Navbar>
          { this.props.player.name ? // this.props.player.name, made this true for testing
            //Routes available once name has been entered
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/room' component={GameRoom} />
              <Route path='/create' component={CreateGame} />
              <Route path='/join' component={JoinGame} />
              <Route path='/' component={EnterName} />
            </Switch>
           :
           //Routes below only available with no name
          <Route path='/' component={EnterName} /> }
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
    player: state.players.player
  }
}

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
