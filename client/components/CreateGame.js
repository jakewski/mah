import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCategoriesThunk } from '../store';
import { CSSTransitionGroup } from 'react-transition-group';

class CreateGame extends Component {
  constructor(){
    super();
  }

  componentDidMount() {
    this.props.getCategoriesThunk()
  }


  render() { 
    console.log('props::', this.props)
    return (
      <CSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={2000} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
        <div key="transition" className="container">
          <h1>Create a New Game</h1>
            <form className="form-group">

              <h3><label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Number of Players:</label></h3>
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

              <div className="form-check noMargin">
              <h3>Select Categories:</h3>
              {
                this.props.categories && this.props.categories.map(category => {
                  return (
                    <div key={category.id} className="checkbox disabled">
                      <label><input type="checkbox" value="" />{category.text}</label>
                    </div>
                    )
                })
              }
              </div>

              <br />
              <br />

              <NavLink to="/room"><button type="submit" className="btn btn-success">Create</button></NavLink>
            </form>
        </div>
      </CSSTransitionGroup>
    )
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    categories: state.categories.categories,
  }
}

const mapDispatchToProps = dispatch => ({
  getCategoriesThunk: () => dispatch(getCategoriesThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame)
