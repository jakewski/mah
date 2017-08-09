import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import history from './history'
import {Navbar, Home, GameRoom, CreateGame, JoinGame} from './components'

/**
 * COMPONENT
 */
class Routes extends Component {

  render () {

    return (
      <Router history={history}>
        <Navbar>
          <Switch>
            <Route path='/room' component={GameRoom} />
            <Route path='/create' component={CreateGame} />
            <Route path='/join' component={JoinGame} />

            <Route path='/' component={Home} />
          </Switch>
        </Navbar>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {}
}

const mapDispatch = (dispatch) => {
  return {}
}

export default connect(mapState, mapDispatch)(Routes)
