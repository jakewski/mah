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
      props.history.push('/')
    })
  }

  return (
      <div className="col-lg-12 text-center navDiv">
          { props.player.activePlayer ?
            <button type="button" onClick={handleQuit} className="btn btn-danger quit">X</button>
            : null
          }
          <div className="row navbarBlue">
            { props.player.activePlayer ?
              <h3 className="welcomeTxt">Welcome, {props.player.name}</h3>
              : null
            }
            <div className="chevronTabs">
              <svg className="chevron" viewBox="0 0 640 640">
                <polygon className="st0" id="XMLID_3035_" points="5,48.7 313.2,228.1 635.5,32.4 635.5,404.8 321.7,593.1 5,411" fill="#f7941d"/>
              </svg>

              <svg className="chevron" viewBox="0 0 640 640">
                <polygon className="st0" id="XMLID_3035_" points="5,48.7 313.2,228.1 635.5,32.4 635.5,404.8 321.7,593.1 5,411" fill="#f7941d"/>
              </svg>

              <svg className="chevron" viewBox="0 0 640 640">
                <polygon className="st0" id="XMLID_3035_" points="5,48.7 313.2,228.1 635.5,32.4 635.5,404.8 321.7,593.1 5,411" fill="#f7941d"/>
              </svg>
            </div>
          </div>
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
