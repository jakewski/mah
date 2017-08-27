import React from 'react';
import socket from "../socket";
import Canvas from './Canvas';
import { connect } from 'react-redux';

class Judgement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winningMeme: undefined,
    }
    this.selectAnswer = this.selectAnswer.bind(this);
    this.moveToNextRound = this.moveToNextRound.bind(this);
  }

  selectAnswer(key){
    let tempThis = this;
    return function(){
      socket.on('roundFinishedJudge', winningMeme => {
        tempThis.setState({ winningMeme: winningMeme });
        socket.emit('switchToNextTurn', tempThis.props.players.room)
      })
      socket.emit('winningMeme', {key, room: tempThis.props.players.room})
    }
  }

  moveToNextRound(e){
      //skipWinner boolean attached to manual no memes submitted button to switch to next round without pausing 5 seconds for winner screen
      socket.emit('switchToNextTurn', this.props.room, true)
  }

  componentWillUnmount(){
    socket.removeListener('roundFinishedJudge');
  }

  render(){
    return (
      <div> {/* judge view when all answers are submitted */}
        {
          (!this.props.submittedAnswers || !Object.keys(this.props.submittedAnswers).length) ?
            <div className="gameAnswerFlex">
              <h3 className="center-text">...seriously? no one submitted anything?</h3>
              <button className="btn" onClick={this.moveToNextRound}>NEXT ROUND</button>
            </div>
          :
            !this.state.winningMeme ?
              (
                <div className="row">
                  <h5 className="center-text">Choose the winner</h5>
                  <div className="all-submissions-flex">
                    {
                      this.props.submittedAnswers ? Object.keys(this.props.submittedAnswers).map((key, index) => {
                        return (
                          <div onClick={this.selectAnswer(key)} onTouchStart={this.selectAnswer(key)} className="scoreText animated bounceInDown" key={index}>
                            {/* instead here we will render each canvas */}
                            <Canvas topText={this.props.submittedAnswers[key].topText} topXcoord={this.props.submittedAnswers[key].topXcoord} topYcoord={this.props.submittedAnswers[key].topYcoord} topFontSize={this.props.submittedAnswers[key].topFontSize} bottomText={this.props.submittedAnswers[key].bottomText} bottomXcoord={this.props.submittedAnswers[key].bottomXcoord} bottomYcoord={this.props.submittedAnswers[key].bottomYcoord} bottomFontSize={this.props.submittedAnswers[key].bottomFontSize} memeUrl={this.props.submittedAnswers[key].memeUrl} />
                          </div>
                        )
                      }) : null
                    }
                  </div>
                </div>
              )
              :
              <div>
                <h3 className="blue center-text">WINNING MEME:</h3>
                <div className="animated swing gameAnswerFlex">
                  <Canvas topText={this.state.winningMeme.topText} topXcoord={this.state.winningMeme.topXcoord} topYcoord={this.state.winningMeme.topYcoord} topFontSize={this.state.winningMeme.topFontSize} bottomText={this.state.winningMeme.bottomText} bottomXcoord={this.state.winningMeme.bottomXcoord} bottomYcoord={this.state.winningMeme.bottomYcoord} bottomFontSize={this.state.winningMeme.bottomFontSize} memeUrl={this.state.winningMeme.memeUrl} />
                </div>
              </div>
        }
    </div>
    )
  }
}
const mapStateToProps = function(state, ownProps) {
  return {
    players: state.players,
    room: state.players.room,
  };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Judgement);
