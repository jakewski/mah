import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import socket from '../socket'
import { NavLink } from 'react-router-dom'
import { addToPlayersThunk, replacePlayersThunk } from '../store';
import ChatBox from './ChatBox'


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
  }

  render() {
    return (
      <CSSTransitionGroup transitionName="fadeIn" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={0} transitionLeaveTimeout={0}>

        <div key="transition" className="container-fluid">
          <h3 style={{marginTop: 0}} >{this.state.gameRoomName}</h3>
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
            {/* <img className="img-responsive center-block" src={this.state.memeUrl} /> */}


            {/*{currentLeader ?
            <div>hello leader</div> : <div>}*/}

            {/*judge logic  */}
            {this.state.playerIsCurrentJudge ?

            <div>
              {this.state.allAnswersSubmitted ?

              <div> {/* judge view when all answers are submitted */}
                <div className="row">
                  <h5>Wield your immense power and deem the proper candidate worthy with an almighty click</h5>
                  <div className="playerScoreFlexBox">
                    {this.state.submittedAnswers.map((answer, index) => {
                      return <button className="scoreText" key={index}>{answer}</button>
                    })}
                  </div>
                </div>
              </div> :

              <div> {/*judge view when waiting on all answers  */}
                  <div className="row">
                  <h5>Waiting on the plebs. Have mercy, good lord</h5>
                  <img src="https://media.tenor.com/images/c3133e236670d969de3b493b1be783b0/tenor.gif" style={{margin: '5px'}} />
                  </div>
              </div>}

            </div> :
            <div> {/*player logic  */}
              {this.state.playerAnswerSubmitted ?

              <div>
                {this.state.allAnswersSubmitted ?

                <div> {/*player view when all answers are submitted  */}
                  <h5>Submitted Meme-ories:</h5>
                  <div className="playerScoreFlexBox">
                    {this.state.submittedAnswers.map((answer, index) => {
                      return <button disabled className="scoreText" key={index}>{answer}</button>
                    })}
                  </div>
                </div> :

                <div> {/*player view when they have answered, but others haven't  */}
                  <div className="row">
                    <h5>Answer submitted, awaiting responses and judge's decision</h5>
                    <img src="https://media.tenor.com/images/cc6658b83d611b906386f779cf37ab0c/tenor.gif" style={{margin: '5px'}} />
                  </div>
                </div>}
              </div> :

              <div> {/*player view when they have not answered yet  */}
                <form className="gameAnswerFlex">

                  <div className="col-lg-6 col-md-6 col-sm-6" style={divStyle}>

                  <img className="img-responsive center-block" src={this.state.memeUrl}   />

                  <div className="form-group col-md-9 col-xs-12 col-lg-6" >
                    <textarea placeholder="me me" className="form-control formPlaceholder" id="formInputTop" rows="1" />
                    <textarea placeholder="me me" className="form-control formPlaceholder" id="formInputBottom" rows="1" />
                  </div>
                  <div className="row">
                    <button type="submit" className="btn btn-success">Submit</button>
                  </div>
                </div>
                </form>
              </div>}
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
    player: state.players,
  }
}

const mapDispatchToProps = dispatch => ({
  addToPlayersThunk: player => dispatch(addToPlayersThunk(player)),
  replacePlayersThunk: players => dispatch(replacePlayersThunk(players))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom)
