import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCategoriesThunk } from '../store';
import { CSSTransitionGroup } from 'react-transition-group';
import socket from '../socket'

class CreateGame extends Component {
  constructor(){
    super();
    this.state = {
      categories: {},
      playerNum: 3,
    }
    this.setCategories = this.setCategories.bind(this);
  }

  componentDidMount() {
    this.props.getCategoriesThunk()
  }

  setCategories(categoryId){
    console.log(this.state);
    return () => this.setState(prev => {
      if(prev.categories[categoryId])
        prev.categories[categoryId] = false;
      else prev.categories[categoryId] = true;

      return prev;
    })
  }

  render() { 
    console.log('props::', this.props)
    return (
      <CSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={2000} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
        <div key="transition" className="container">
          <h1>Create a New Game</h1>
            <form className="form-group" onSubmit={this.props.handleSubmit(this.state.categories)}>

              <div className="col"></div>
              <div className="col">
                <h3>Enter Your Name:</h3>
                <input type="text" name="name" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Enter Name" />
              </div>
              <div className="col"></div>

              <h3><label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Number of Players:</label></h3>
              <select className="custom-select mb-2 mr-sm-2 mb-sm-0" id="inlineFormCustomSelect" name="players">
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
                      <div key={category.id} className="checkbox">
                        <label><input type="checkbox" onChange={this.setCategories(category.id)} name={`category${category.id}`} value={category.text} />{category.text}</label>
                      </div>
                      )
                  })
                }
              </div>

              <br />
              <br />
              
            <button type="submit" className="btn btn-success">Create</button>
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
  getCategoriesThunk: () => dispatch(getCategoriesThunk()),
  handleSubmit: categories => event => {
    event.preventDefault();
    let checkedCategories = Object.keys(categories).filter(key => categories[key])
    socket.emit('createGame', {
      categories: checkedCategories,
      playerNum: event.target.players.value
    })

  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame)
