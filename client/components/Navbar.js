import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter, Link, NavLink } from 'react-router-dom';
import Home from './Home';
import axios from 'axios';
import { removePlayer } from '../store';
import history from '../history';

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

  const handleClickLogo = function(e) {
    history.push('/');
  }

  const handleMemeStream = function(e) {
    history.push('/stream');
  }

  return (
      <div className="text-center navbarCol">
        <div>
          <div className="col-lg-12 navDiv" onClick={handleClickLogo}>
            <h1 className="logo">MEMES</h1>
            <h1 className="logo">AGAINST</h1>
            <h1 className="logo">HUMANITY</h1>
          </div>
          { props.player.activePlayer ?
            <div className="col-lg-12 navBarDiv">
              <button type="button" onClick={handleQuit} className="navBtn">HOW TO</button>
              <p className="navBarDivider">|</p>
              <button type="button" onClick={handleMemeStream} className="navBtn">STREAM</button>
              <p className="navBarDivider">|</p>
              <button type="button" onClick={handleQuit} className="navBtn">LOG OUT</button>
            </div>
            : null
          }
        </div>
        <div className="row"></div>
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
