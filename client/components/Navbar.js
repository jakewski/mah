import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter, Link, NavLink } from 'react-router-dom';
import Home from './Home';
import axios from 'axios';
import { removePlayer } from '../store'


/**
 * COMPONENT
 *  The Navbar component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Navbar = (props) => {
  const { children } = props;

  const handleQuit = () => {
    axios.delete('/api/player/')
    .then(() => props.removePlayer())
    .then(() => {
      return props.history.push('/')
    })
    .catch(err => console.log(err))
  }

  return (
      <div className="col-lg-12 text-center">
          { props.player.activePlayer ?
            <button type="button" onClick={handleQuit} className="btn btn-danger quit">X</button>
            : null
          }
          <div className="row">
            <NavLink className="mainTitleLink" to="/"><h1 className="mainTitle">Memes Against Humanity</h1></NavLink>
            { props.player.activePlayer ?
              <h3>Welcome, {props.player.name}</h3>
              : null
            }
          </div>
          <hr />
          { children }
      </div>
  );
};


/**
 * PROP TYPES
 */
Navbar.propTypes = {
  children: PropTypes.object,
}

const mapStateToProps = function(state, ownProps) {
  return {
    player: state.players.player
  }
}

const mapDispatchToProps = dispatch => ({
  removePlayer: () => dispatch(removePlayer()),
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
