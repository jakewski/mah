import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import socket from '../socket'
import { NavLink } from 'react-router-dom'
import { addToPlayersThunk, replacePlayersThunk, setRoomThunk } from '../store';
import { JudgeWaiting, ChatBox, Judgement, PlayerJudgement, PlayerWaiting, PlayerAnswering } from '../components'
import axios from 'axios'


var divStyle = {
  backgroundImage: 'url(' + 'https://imgflip.com/s/meme/Futurama-Fry.jpg' + ')',
};

class GameRoom extends Component {
  constructor(){
    super();
    this.state = {
      gameId: '',
      submittedAnswers: ['this component is working, or if it is just the right time of day', 'I should submit an answer, or stall','this component is working, or if it is just the right time of day', 'I should submit an answer, or stall','this component is working, or if it is just the right time of day', 'I should submit an answer, or stall'],
      formInputTop: '',
      formInputBottom: '',
      allAnswersSubmitted: false,
      playerIsCurrentJudge: false,
      playerAnswerSubmitted: false,
      currentJudgeIndex: 0,
      memeUrl: 'https://imgflip.com/s/meme/Futurama-Fry.jpg',
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
    // socket.on('getCode', (code) => {
    //   this.setState({gameId: code})
    // })
    // socket.on('addPlayerLocally', player => {
    //   console.log('pLAYER: ', this.props.player);
    //   this.props.addToPlayersThunk(player);
    //   socket.emit('replacePlayers', [...this.props.player.players, player])
    // })
    socket.on('replacedPlayers', players => {
      this.props.replacePlayersThunk(players);
    })
    //socket.emit('switchToNextTurn');
  }

  render() {
    return (
      <CSSTransitionGroup transitionName="fadeIn" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={0} transitionLeaveTimeout={0}>

        <div key="transition" className="container-fluid">
          <h3 style={{marginTop: 0}} >{this.state.gameRoomName}-Room Code: {this.props.room}</h3>
          <div className="row">
            <div className="col-xs-6">
              <h5>Turn Number: 35</h5>
            </div>
            <div className="col-xs-6">
              <h5>Current Judge: {this.state.playerNames[this.state.currentJudgeIndex]}</h5>
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
            </div> :
            <div> {/*player logic  */}
              {this.state.playerAnswerSubmitted ?
              <div>
                {this.state.allAnswersSubmitted ?
                <PlayerJudgement submittedAnswers={this.state.submittedAnswers} /> :
                <PlayerWaiting />}
              </div> :
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
