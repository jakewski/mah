import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import socket from '../socket'
import { NavLink } from 'react-router-dom'
import { addToPlayers, replacePlayers, setRoom } from '../store';
import { Pregame, JudgeWaiting, ChatBox, Judgement, PlayerJudgement, PlayerWaiting, PlayerAnswering } from '../components'
import axios from 'axios'

class GameRoom extends Component {
  constructor(){
    super();
    this.state = {
      judge: {},
      turnNumber: 0,
      gameStarted: false,
      submittedAnswers: [],
      allAnswersSubmitted: false,
      playerIsCurrentJudge: false,
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
  }

  componentWillMount() {
    // axios.get('/api/room')
    // .then(res => {
    //   if(res.data.activeRoom) {
    //     console.log('is this api call to room happening?')
    //     this.props.setRoom(res.data.room)
    //   }
    // })
    axios.get('/api/room')
    .then( res => {
      console.log('session room is ', {id: res.data.room})
      this.props.setRoom({id: res.data.room})
      socket.emit('getGameState', res.data.room)
      socket.on('recievePlayers', players => {
        this.props.replacePlayers(players)
      })
      return null
    })
    .catch(err => console.log(err))
  }
  componentWillUnmount(){
    socket.removeListener('replacedPlayers');
    socket.removeListener('gameStarted');
    socket.removeListener('gotAllAnswers');
    socket.removeListener('roundFinishedJudge');
    socket.removeListener('playerAnswered');
    socket.removeListener('recievePlayers');
  }

  componentDidMount() {
    socket.on('replacedPlayers', players => {
      this.props.replacePlayers(players);
    })
    socket.on('gameStarted', turn => {
      let isJudge = turn.judge.id === this.props.player.socketId;
      console.log('isJudge:', isJudge)
      let newState = {
        gameStarted: true,
        memeUrl: turn.meme.image,
        memeTopText: turn.meme.topText,
        memeBottomText: turn.meme.bottomText,
        category: turn.category,
        judge: turn.judge,
        playerIsCurrentJudge: isJudge,
        gamePlayers: turn.gamePlayers,
        allAnswersSubmitted: false,
        playerAnswerSubmitted: false,
        turnNumber: turn.turnNumber,
        roundUnjudged: false,
        submittedAnswers: {},
      }
      this.setState(newState)
    })
    socket.on('gotAllAnswers', answers => {
      this.setState({
        submittedAnswers: answers,
        allAnswersSubmitted: true,
      })
    })
    socket.on('playerAnswered', (currentAnswers, isThisPlayer) => {
      this.setState({
        submittedAnswers: currentAnswers,
      })
      if(isThisPlayer) {
        this.setState({
          playerAnswerSubmitted: true,
        })
      }
    })
    socket.on('roundFinishedJudge', winningAnswer => {
      this.setState({
        roundUnjudged: true
      })
    })
    // socket.on('incrementScore', (playerId) => {

    // })
  }
  leaveGameButton(){
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
            <div className="row">
              <div className="col-xs-6">
                <h5>Turn Number: {this.state.turnNumber}</h5>
              </div>
              <div className="col-xs-6">
                <h5>Current Judge: {this.state.judge.name}</h5>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="playerScoreFlexBox">
                {this.state.gamePlayers.map((player, index) => {
                  return (
                    <div key={index}>
                      {
                        this.state.judge.id === player.id ?
                          this.state.allAnswersSubmitted && !this.state.roundUnjudged ?
                            <div>
                              <div className="scoreText blue name" key={index}>{player.name}: {player.score} </div>
                              <div className="loadingBlue right load"></div>
                            </div>
                          :
                            <div>
                              <div className="scoreText blue" key={index}>{player.name}: {player.score} ★</div>
                            </div>
                        :
                          Object.keys(this.state.submittedAnswers).includes(player.id)
                          ? <div className="scoreText green" key={index}>{player.name}: {player.score} ✓</div>
                          : <div>
                              <div className="scoreText red name" key={index}>{player.name}: {player.score} </div>
                              <div className="loadingRed right load"></div>
                            </div>
                      }
                    </div>
                  )
                })}
              </div>
            </div>
            <hr />
            <div className="row">
              <h3>Category: {this.state.category}</h3>
            </div>
            <hr />
            <div className="row">
              {/*judge logic  */}
              {this.state.playerIsCurrentJudge ?
              <div>
                {this.state.allAnswersSubmitted ?
                <Judgement submittedAnswers={this.state.submittedAnswers} /> :
                <JudgeWaiting/>}
              </div>
              :
              <div> {/*player logic  */}
                {this.state.playerAnswerSubmitted ?
                <div>
                  {this.state.allAnswersSubmitted ?
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
                <div className="col-sm-12 col-md-10 col-lg-10">
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
