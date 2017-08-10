import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter, Link, NavLink } from 'react-router-dom';
import Home from './Home';


/**
 * COMPONENT
 *  The Navbar component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Navbar = (props) => {
    const { children } = props;

    return (
            <div className="col-lg-12 text-center">
                <NavLink className="mainTitleLink" to="/home"><h1 className="mainTitle">Memes Against Humanity</h1></NavLink>
                <nav>
                    {/*<Link to="/home">Home</Link>*/}
                </nav>
                <hr />
                { children }
            </div>
    );
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Navbar);


/**
 * PROP TYPES
 */
Navbar.propTypes = {
  children: PropTypes.object,
}