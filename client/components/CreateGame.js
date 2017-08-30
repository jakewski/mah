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
    let newCategories = [ ...this.state.userCategories, newCategory]
    this.setState({userCategories: newCategories, customCategory: ''})
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
  // removeCategory(event){
  //   event.preventDefault()
  //   let newArray = this.state.userCategories.filter(category => category !== event.target.value)
  //   this.setState({userCategories: newArray})
  // }


  //custom category validation
  inputWithinLimit(){
    return this.state.customCategory.length <= 50
  }



  render() {
    console.log('state categories', this.state.categories, this.state.userCategories)
    return (
      <CSSTransitionGroup transitionName="fadeIn" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
        <div key="transition" className="container createGame">
          <h3 className="createText">CREATE NEW GAME</h3>
            <form className="form-group create-game-form-flex" onSubmit={(event) => this.handleSubmit(event, this.state.categories, this.props.player)}>

              <br />

              <div className="form-check noMargin">
              <h3 className="selectCatText">Select Categories:</h3>
{/*                <div className="checkbox">
                  <label className="blue" onClick={this.selectAll}><input type="checkbox" />Select All</label>
                </div>*/}
                {
                  this.props.categories && this.props.categories.map(category => {
                    return (
                      <div key={category.id} className="checkbox">
                        <label><input type="checkbox" className="check" onClick={this.markCategoriesDirty} onChange={this.setCategories(category.text)} name={`category${category.id}`} value={category.text} />{category.text}</label>
                      </div>
                      )
                  })
                }

                {this.state.userCategories.map((category, index) => {
                  return (
                      <div key={index} className="checkbox">
                        <label><input type="checkbox" className="check" name={`category${category.id}`} value={category.text} defaultChecked={true} />{category}</label>
                      </div>
                      // <li style={{textAlign: 'left'}} key={index}>
                      //   <button value={category} key={index} className="btn" style={{marginRight: '10px', marginBottom: '10px', fontSize: '8px'}} onClick={this.removeCategory} type="button" >x</button>{category}
                      // </li>
                    )
                })}
              </div>
                <div className="gameAnswerFlex" style={{marginTop: '0px', paddingTop: '0px'}}>
                  <div className="enter-custom-categories">
                    <input value={this.state.customCategory} onChange={this.setCustomCat} type="text" className="form-control mb-2 mr-sm-2 mb-sm-0 input enter-category" id="inlineFormInput" placeholder="Enter New Category" />
                    <button type="submit" className="btn create-category-btn" onClick={this.submitPersonalCategories} disabled={!this.inputWithinLimit()}><i className="material-icons create-icon">subdirectory_arrow_left</i></button>
                  </div>
                  <button type="submit" className="btn createGameBtn">CREATE GAME</button>
                  {/*<button style={{marginTop: '10px', width: '100%'}} type="button" onClick={this.selectAll} className="btn">Create Game with All Categories</button>*/}
                </div>
            <br />
            {
              (this.noCategoriesSelected(this.state.categories) && this.state.categoriesDirty && (this.state.userCategories.length === 0)) ?
                <span className="validation">Must select at least one category</span> :
                null
            }
            {
              !this.inputWithinLimit() ?
              <span className="validation">Category too long</span> :
              <span className="validation"></span>
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
