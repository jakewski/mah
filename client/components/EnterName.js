import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ReactCSSTransitionGroup } from 'react-transition-group';

class EnterName extends Component {
  constructor(){
    super();
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="container-fluid">
          <div className="row">
            <form className="form-inline">
              <h1 className="whatsYourName">Hello, what is your name?</h1>
              <br />
              <label className="sr-only" htmlFor="inlineFormInput">Name</label>
              <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Jane Doe" />
              <NavLink to="/home"><button type="submit" className="btn btn-success marginLeft">Enter</button></NavLink>
            </form>
          </div>
      </div>
    )
  }
}

const mapStateToProps = function(state, ownProps) {
  return {}
}

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(EnterName)
