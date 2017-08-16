import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCategoriesThunk, setRoom } from '../store';
import { CSSTransitionGroup } from 'react-transition-group';
import socket from '../socket'
import history from '../history';
import axios from 'axios'

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
    socket.on('getCode', code => {
      console.log('GAME CODE: ', code);
      this.props.setRoom({id: code, host: this.props.player});
      axios.post('/api/room', {
        room: code,
      })
    })
  }

  setCategories(categoryId){
    return () => this.setState(prev => {
      if(prev.categories[categoryId])
        prev.categories[categoryId] = false;
      else prev.categories[categoryId] = true;

      return prev;
    })
  }

  render() { 
    return (
      <CSSTransitionGroup transitionName="fadeIn" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
        <div key="transition" className="container">
          <h1>Create a New Game</h1>
            <form className="form-group" onSubmit={this.props.handleSubmit(this.state.categories, this.props.player.name)}>

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
                        <label><input type="checkbox" onChange={this.setCategories(category.text)} name={`category${category.id}`} value={category.text} />{category.text}</label>
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
    player: state.players.player,
  }
}

const mapDispatchToProps = dispatch => ({
  getCategoriesThunk: () => dispatch(getCategoriesThunk()),
  setRoom: code => dispatch(setRoom(code)),
  handleSubmit: (categories, playerName) => event => {
    event.preventDefault();
    let checkedCategories = Object.keys(categories).filter(key => categories[key])
    socket.emit('createGame', {
      categories: checkedCategories,
      playerNum: event.target.players.value,
      playerName: playerName,
    })
    history.push('/room')

  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame)
