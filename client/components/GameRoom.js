import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import socket from '../socket'
import { NavLink } from 'react-router-dom'
import { addToPlayersThunk, replacePlayersThunk, setRoomThunk } from '../store';
import { Pregame, JudgeWaiting, ChatBox, Judgement, PlayerJudgement, PlayerWaiting, PlayerAnswering } from '../components'
import axios from 'axios'


var divStyle = {
  backgroundImage: 'url(' + 'https://imgflip.com/s/meme/Futurama-Fry.jpg' + ')',
};

class GameRoom extends Component {
  constructor(){
    super();
    this.state = {
      judge: {},
      gameStarted: false,
      submittedAnswers: [],
      formInputTop: '',
      formInputBottom: '',
      allAnswersSubmitted: false,
      playerIsCurrentJudge: false,
      playerAnswerSubmitted: false,
      currentJudgeIndex: 0,
      memeUrl: '',
      memeText: '',
      gameRoomName: 'Bad Boys and Girls of America',
      playerNames: ['Brion', 'Jakubucci', "lil' BAnnBAnn", 'Madelean', 'King Ray', 'CharlesMan', 'Ray Chartles'],

    }
  }

  componentWillMount() {
    axios.get('/api/room')
    .then(res => {
      if(res.data.activeRoom) {
        this.props.setRoomThunk(res.data.room)
      }
    })
  }

  componentDidMount() {
    socket.on('replacedPlayers', players => {
      this.props.replacePlayersThunk(players);
    })
    socket.on('gameStarted', turn => {
      let isJudge = turn.judge.id === this.props.player.socketId;
      console.log('isJudge:', isJudge)
      let newState = { 
        gameStarted : true,
        memeUrl: turn.meme.image,
        memeText: turn.meme.text,
        category: turn.category,
        judge: turn.judge,
        playerIsCurrentJudge: isJudge,
        playerNames: turn.playerNames,
      }
      this.setState(newState)
    })
    socket.on('gotAllAnswers', answers => {
      this.setState({
        submittedAnswers: answers,
        allAnswersSubmitted: true,
      })
    })
    socket.on('playerAnswered', () =>{
      this.setState({
        playerAnswerSubmitted: true,
      })
    })
  }

  render() {
    return (
      <CSSTransitionGroup transitionName="fadeIn" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={0} transitionLeaveTimeout={0}>

        <div key="transition" className="container-fluid">
          <h3 style={{marginTop: 0}} >{this.state.gameRoomName}-Room Code: {this.props.room}</h3>
          {this.state.gameStarted ? 
          (<div>
            <div className="row">
              <div className="col-xs-6">
                <h5>Turn Number: 35</h5>
              </div>
              <div className="col-xs-6">
                <h5>Current Judge: {this.state.judge.name}</h5>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="playerScoreFlexBox">
                {this.state.playerNames.map((player, index) => {
                  return <div className="scoreText" key={index}>{player}: ##</div>
                })}
              </div>
            </div>
            <hr />
            <div className="row">
              {/*judge logic  */}
              {this.state.playerIsCurrentJudge ?
              <div>
                {this.state.allAnswersSubmitted ?
                <Judgement submittedAnswers={this.state.submittedAnswers} /> :
                <JudgeWaiting />}
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
               <PlayerAnswering memeUrl={this.state.memeUrl} />}
              </div>}
            </div>
            <div className="row">
              <div className="gameAnswerFlex endOfGameRoom">
                <div className="col-sm-12 col-md-10 col-lg-10">
                  <ChatBox />
                </div>
              </div>
            </div>
          </div>) : <Pregame />}
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
  addToPlayersThunk: player => dispatch(addToPlayersThunk(player)),
  replacePlayersThunk: players => dispatch(replacePlayersThunk(players)),
  setRoomThunk: code => dispatch(setRoomThunk(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom)
