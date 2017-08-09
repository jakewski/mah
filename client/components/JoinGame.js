import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'

class JoinGame extends Component {
  constructor(){
    super();
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h1>Join Game</h1>

        <form className="form-group">

            <div className="col"></div>
            <div className="col">
              <label className="sr-only" htmlFor="inlineFormInput">Enter Name</label>
              <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Enter Name" />
            </div>
            <div className="col"></div>

            <br />

            <div className="col"></div>
            <div className="col">
              <label className="sr-only" htmlFor="inlineFormInput">Enter Room Code</label>
              <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Enter Room Code" />
            </div>
            <div className="col"></div>

            <br />
            <br />

            <NavLink to="/room"><button type="submit" className="btn btn-success">Join</button></NavLink>
          </form>
      </div>
    )
  }
}

const mapStateToProps = function(state, ownProps) {
  return {}
}

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame)
