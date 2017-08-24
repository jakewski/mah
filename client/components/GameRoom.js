import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import socket from '../socket'
import { NavLink } from 'react-router-dom'
import { addToPlayers, replacePlayers, setRoom } from '../store';
import { Pregame, JudgeWaiting, ChatBox, Judgement, PlayerJudgement, PlayerWaiting, PlayerAnswering, Scoreboard, ScoreboardPlayers } from '../components'
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
      timeout: false,
      currentTimer: 0,
    }
    this.leaveGameButton = this.leaveGameButton.bind(this);
    this.endGameButton = this.endGameButton.bind(this);
    // this.tick = this.tick.bind(this)
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

  componentWillUnmount() {
    socket.removeListener('recieveGameState');
    socket.removeListener('replacedPlayers');
    socket.removeListener('gameStarted');
    socket.removeListener('gotAllAnswers');
    socket.removeListener('playerAnswered');
    socket.removeListener('setTimer');
    //clearInterval(this.state.timer)
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
        currentTimer: 60,
      }
      this.props.replacePlayers(turn.gamePlayers);
      this.setState(newState);
      socket.emit('startTick', this.props.room);

      //timeout for players taking too long
      // setTimeout(() => {
      //   socket.emit('timeout', this.props.room)
      // }, this.state.timeAllowed)

    })

    socket.on('setTimer', time => {
      this.setState({ currentTimer: time });
    })

    socket.on('gotAllAnswers', answers => {
      socket.emit('clearTick');
      this.setState({
        submittedAnswers: answers,
        allAnswersSubmitted: true,
        currentTimer: 0,
      })
    })

    socket.on('timeout', () => {
      this.setState({ timeout: true });
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
  }

  // tick(){
  //   if(this.state.currentTimer > 0) {
  //     this.setState({
  //       currentTimer: this.state.currentTimer - 1000,
  //     })
  //   }
  //   else {
  //     clearInterval(this.state.timer);
  //   }
  // }

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

        <div key="transition" className="container">
          {(this.props.players.length === 1) ? <div className="flex-center"><h5 className="get-friends">Invite Friends! You can't play this game by yourself. </h5></div> :
          (this.props.players.length === 2) ? <div className="flex-center"><h5 className="get-friends">You need more than two people for there to be a winner!</h5></div> : null}
          {this.state.gameStarted ?
          (<div>
           <Scoreboard judge={this.state.judge} turnNumber={this.state.turnNumber} submittedAnswers={this.state.submittedAnswers} allAnswersSubmitted={this.state.allAnswersSubmitted} timeout={this.state.timeout} timeAllowed={this.state.timeAllowed} currentTimer={this.state.currentTimer} category={this.state.category}/>
          <div className="row sbAndAnswerRow">
            <div className="row">
             <ScoreboardPlayers players={this.props.players} judge={this.state.judge} allAnswersSubmitted={this.props.allAnswersSubmitted} timeout={this.state.timeout} submittedAnswers={this.state.submittedAnswers}/>
              <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 col10">
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
            </div>
            </div>
          </div>) : <Pregame room={this.props.room} />}
              <div className="gameAnswerFlex endOfGameRoom">
                <div className="gameRoomChat">
                  <div className="col-sm-9 col-md-9 col-lg-9 chatBoxCol">
                    <ChatBox />
                  </div>
                </div>
            </div>
            {this.state.gameStarted ?
            <div className="row ">
              <div className="gameAnswerFlex">
                {(this.props.players[0].sessionId === this.props.player.sessionId) ?
                <button type="button" onClick={this.endGameButton} className="btn">End Game</button> :
                <button type="button" onClick={this.leaveGameButton} className="btn">Leave Game</button>}
              </div>
              <br />
            </div> : <div />}
            {this.state.gameStarted ? <div className="room-code-div"><h3 style={{marginTop: 0}} >Room Code: {this.props.room}</h3></div> : null}
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
