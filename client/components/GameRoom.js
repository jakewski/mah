import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import socket from '../socket'
import { NavLink } from 'react-router-dom'
import { addToPlayers, replacePlayers, setRoom } from '../store';
import { Pregame, JudgeWaiting, ChatBox, Judgement, PlayerJudgement, PlayerWaiting, PlayerAnswering, Scoreboard } from '../components'
import axios from 'axios'

class GameRoom extends Component {
  constructor(){
    super();
    this.state = {
      judge: {},
      turnNumber: 0,
      gameStarted: false,
      submittedAnswers: {},
      allAnswersSubmitted: false,
      playerAnswerSubmitted: false,
      memeUrl: '',
      memeTopText: '',
      memeBottomText: '',
      gameRoomName: 'Bad Boys and Girls of America',
      gamePlayers: [],
      isHost: true,
    }
    this.leaveGameButton = this.leaveGameButton.bind(this);
    this.endGameButton = this.endGameButton.bind(this);
    this.tick = this.tick.bind(this)
  }

  componentWillMount() {
    socket.on('recieveGameState', ({ gamePlayers, gameStarted, judge, turnNumber, answers, meme, allAnswersSubmitted, playerAnswerSubmitted, category }) => {
      this.props.replacePlayers(gamePlayers)
      this.setState({ gameStarted, judge, turnNumber, submittedAnswers: answers, memeUrl: meme.image, memeTopText: meme.topText, memeBottomText: meme.bottomText, allAnswersSubmitted, playerAnswerSubmitted, category })
    })
    axios.get('/api/room')
    .then( res => {
      this.props.setRoom({id: res.data.room})
      return socket.emit('getGameState', res.data.room)
    })
    .catch(err => console.log(err))
  }

  componentDidMount() {
    socket.on('replacedPlayers', players => {
      this.props.replacePlayers(players);
    })
    socket.on('gameStarted', turn => {
      let newState = {
        gameStarted: true,
        memeUrl: turn.meme.image,
        memeTopText: turn.meme.topText,
        memeBottomText: turn.meme.bottomText,
        category: turn.category,
        judge: turn.judge,
        gamePlayers: turn.gamePlayers,
        allAnswersSubmitted: false,
        playerAnswerSubmitted: false,
        turnNumber: turn.turnNumber,
        submittedAnswers: {},
        timeout: false,
        timer: setInterval(this.tick, 1000),
        timeAllowed: 20000,
        currentTimer: 20000,
      }
      this.props.replacePlayers(turn.gamePlayers)
      this.setState(newState)

      //timeout for players taking too long
      setTimeout(() => {
        socket.emit('timeout', this.props.room)
      }, this.state.timeAllowed)

    })

    socket.on('gotAllAnswers', answers => {
      this.setState({
        submittedAnswers: answers,
        allAnswersSubmitted: true,
        currentTimer: 0,
      })
    })
    socket.on('playerAnswered', (currentAnswers, isThisPlayer, timeout) => {
      this.setState({
        submittedAnswers: currentAnswers,
      })
      if(isThisPlayer) {
        this.setState({
          playerAnswerSubmitted: true,
        })
      }
      if(timeout) {
        this.setState({
          timeout: true,
        })
      }
    })
    // socket.on('incrementScore', (playerId) => {

    // })
  }

  tick(){
    if(this.state.currentTimer > 0) {
      this.setState({
        currentTimer: this.state.currentTimer - 1000,
      }) 
    }
    else {
      clearInterval(this.state.timer);
    }
  }

  leaveGameButton() {
    console.log('clicked leave game')
    //need to remove player from the game, reset his room, and direct him to the home lobby
    //
   }
  endGameButton(){
    console.log('clicked leave game')
    //need to remove player from the game, reset his room, and direct him to the home lobby
    //
   }

  render() {
    return (
      <CSSTransitionGroup transitionName="fadeIn" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={0} transitionLeaveTimeout={0}>

        <div key="transition" className="container-fluid">
          <h3 style={{marginTop: 0}} >Room Code: {this.props.room}</h3>
          {this.state.gameStarted ?
          (<div>
           <Scoreboard judge={this.state.judge} turnNumber={this.state.turnNumber} gamePlayers={this.state.gamePlayers} submittedAnswers={this.state.submittedAnswers} allAnswersSubmitted={this.state.allAnswersSubmitted} timeout={this.state.timeout} timeAllowed={this.state.timeAllowed} currentTimer={this.state.currentTimer}/>
            <div className="row">
              <h3>Category: {this.state.category}</h3>
            </div>
            <hr />
            <div className="row">
              {/*judge logic  */}
              {this.state.judge.sessionId === this.props.player.sessionId ?
              <div>
                {this.state.allAnswersSubmitted ?
                <Judgement submittedAnswers={this.state.submittedAnswers} /> :
                <JudgeWaiting />}
              </div>
              :
              <div> {/*player logic  */}
                {this.state.playerAnswerSubmitted || this.state.timeout ?
                <div>
                  {this.state.allAnswersSubmitted || this.state.timeout ?
                  <PlayerJudgement submittedAnswers={this.state.submittedAnswers} /> :
                  <PlayerWaiting />}
                </div>
                :
               <PlayerAnswering memeUrl={this.state.memeUrl} memeTopText={this.state.memeTopText} memeBottomText={this.state.memeBottomText} />}
              </div>}
            </div>
          </div>) : <Pregame />}
            <div className="row">
              <div className="gameAnswerFlex endOfGameRoom">
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <ChatBox />
                </div>
              </div>
            </div>
            {this.state.gameStarted ?
            <div className="row">
              <div className="gameAnswerFlex">
                {(this.props.players[0].sessionId === this.props.player.sessionId) ?
                <button type="button" onClick={this.endGameButton} className="btn btn-primary btn-lg btn-block btn-danger">End Game</button> :
                <button type="button" onClick={this.leaveGameButton} className="btn btn-primary btn-lg btn-block btn-danger">Leave Game</button>}
              </div>
              <br />
            </div> : <div />}

        </div>

      </CSSTransitionGroup>
    )
  }
}
// host?- starting funcionality, add or remove players, boot!

const mapStateToProps = function(state, ownProps) {
  return {
    player: state.players.player,
    players: state.players.players,
    room: state.players.room
  }
}

const mapDispatchToProps = dispatch => ({
  addToPlayers: player => dispatch(addToPlayers(player)),
  replacePlayers: players => dispatch(replacePlayers(players)),
  setRoom: code => dispatch(setRoom(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom)
