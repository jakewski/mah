import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'


/**
 * COMPONENT
 */
export const Home = (props) => {

  return (
    <div className="col-lg-12 text-center">
      <NavLink to="/create"><button type="button" className="btn btn-success larger">Create Game</button></NavLink>
      <br />
      <br />
      <br />
      <NavLink to="/join"><button type="button" className="btn btn-success larger">Join Game</button></NavLink>
    </div>
  )
}

export default Home
