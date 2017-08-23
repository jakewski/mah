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
      categoriesDirty: false,
      playerNum: 3,
      userCategories: [],
      customCategory: '',
    }
    this.setCategories = this.setCategories.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.markCategoriesDirty = this.markCategoriesDirty.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.submitPersonalCategories = this.submitPersonalCategories.bind(this)
    this.setCustomCat = this.setCustomCat.bind(this)
  }

  componentDidMount() {
    this.props.getCategoriesThunk()
    socket.on('getCode', code => {
      console.log('GAME CODE: ', code);
      this.props.setRoom({id: code, host: this.props.player});
      axios.post('/api/room', { room: code })
      .then(() => {
        history.push('/room')
      })
      .catch(err => console.log(err))
    })
  }

  setCategories(categoryId){
    return () => this.setState(prev => {
      if (prev.categories[categoryId]) prev.categories[categoryId] = false;
      else prev.categories[categoryId] = true;
      return prev;
    })
  }

  noCategoriesSelected(categories) {
    for (var keys in categories){
      if (categories[keys] === true) {
        return false;
      }
    }
    return true;
  }

  markCategoriesDirty(){
    this.setState({
      categoriesDirty: true
    })
  }

  handleSubmit(event, categories, player) {
    event.preventDefault();
    let checkedCategories = Object.keys(categories).filter(key => categories[key])
    checkedCategories = checkedCategories.concat(this.state.userCategories)
    if (checkedCategories.length > 0) {
      socket.emit('createGame', {
        categories: checkedCategories,
        playerName: player.name,
        sessionId: player.sessionId,
        socketId: player.socketId,
        gameStarted: false,
      })
    } else {
      this.markCategoriesDirty();
    }
  }
  submitPersonalCategories(event){
    event.preventDefault()
    let newCategory = this.state.customCategory
    let newArray = [ ...this.state.userCategories, newCategory]
    this.setState({userCategories: newArray})
    this.setState({customCategory: ''})
  }

  selectAll(event){
    event.preventDefault()
    let catArray = Object.keys(this.props.categories).map(key => this.props.categories[key].text)
    catArray = catArray.concat(this.state.userCategories)
    let player = this.props.player
    socket.emit('createGame', {
      categories: catArray,
      playerName: player.name,
      sessionId: player.sessionId,
      socketId: player.socketId,
      gameStarted: false,
    })
  }
  setCustomCat(event){
    this.setState({customCategory: event.target.value})
  }

  render() {
    return (
      <CSSTransitionGroup transitionName="fadeIn" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
        <div key="transition" className="container">
          <h1>Create a New Game</h1>
            <form className="form-group" onSubmit={(event) => this.handleSubmit(event, this.state.categories, this.props.player)}>

              <br />

              <div className="form-check noMargin">
              <h3>Select Categories:</h3>
                {
                  this.props.categories && this.props.categories.map(category => {
                    return (
                      <div key={category.id} className="checkbox">
                        <label><input type="checkbox" onClick={this.markCategoriesDirty} onChange={this.setCategories(category.text)} name={`category${category.id}`} value={category.text} />{category.text}</label>
                      </div>
                      )
                  })
                }
              </div>
              <br />
              <div className="row" style={{marginTop: '0px', paddingTop: '0px'}}>
                <div className="gameAnswerFlex" style={{marginTop: '0px', paddingTop: '0px'}}>
                  <ul>
                  {this.state.userCategories.map((category, index) => {
                    return <li style={{textAlign: 'center'}} key={index}>{category}</li>
                  })}
                  </ul>
                  <input style={{textAlign: 'center'}} className="form-control" placeholder="write in a category here" type="text" value={this.state.customCategory} onChange= {this.setCustomCat} />
                  <button style={{margin: '10px 0' }} className="btn btn-warning" type="submit" onClick={this.submitPersonalCategories}>Enter Custom Category</button>

                  <button type="submit" className="btn btn-success">Create Game with Selected Categories</button>
                  <button style={{marginTop: '10px', width: '100%'}} type="button" onClick={this.selectAll} className="btn btn-info">Create Game with All Categories</button>
                </div>
              </div>
            <br />
            {
              this.noCategoriesSelected(this.state.categories) && this.state.categoriesDirty ?
                <span className="alert alert-danger validationSpan">Must select at least one category</span> :
                null
            }
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
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame)
