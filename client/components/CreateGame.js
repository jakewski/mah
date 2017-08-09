import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'

class CreateGame extends Component {
  constructor(){
    super();
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h1>Create a New Game</h1>
          <form className="form-group">

            <div className="col"></div>
            <div className="col">
              <label className="sr-only" htmlFor="inlineFormInput">Enter Name</label>
              <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Enter Name" />
            </div>
            <div className="col"></div>

            <br />
            <br />

            <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Number of Players</label>
            <select className="custom-select mb-2 mr-sm-2 mb-sm-0" id="inlineFormCustomSelect">
              <option value="3">Three</option>
              <option value="4">Four</option>
              <option value="5">Five</option>
              <option value="6">Six</option>
              <option value="7">Seven</option>
              <option value="8">Eight</option>
              <option value="9">Nine</option>
              <option value="10">Ten</option>
            </select>

            <br />
            <br />

            <div className="form-check noMargin">
              <label className="form-check-label">Select Categories:
                <br />
                <input className="form-check-input" type="checkbox" value="" />
                Option one is this and that&mdash;be sure to include why it's great
              </label>
            </div>

            <br />

            <div className="form-check noMargin">
              <label className="form-check-label">
                <input className="form-check-input" type="checkbox" value="" />
                Option one is this and that&mdash;be sure to include why it's great
              </label>
            </div>

            <br />
            <br />

            <NavLink to="/room"><button type="submit" className="btn btn-success">Create</button></NavLink>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame)
