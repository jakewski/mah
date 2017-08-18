import React from 'react';
import socket from "../socket";
import Canvas from './Canvas';

export default class Judgement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winningMeme: undefined,
    }
    this.selectAnswer = this.selectAnswer.bind(this);
  }

  selectAnswer(key){
    let tempThis = this;
    return function(){
      socket.emit('winningMeme', key)
      socket.on('roundFinishedJudge', winningMeme => {
        tempThis.setState({ winningMeme: winningMeme });
        socket.emit('switchToNextTurn')
      })
    }
  }

  componentWillUnmount(){
    socket.removeListener('roundFinishedJudge');
  }

  render(){
    return (
      <div> {/* judge view when all answers are submitted */}
        { !this.state.winningMeme ? (<div className="row">
          <h5>Wield your immense power and deem the proper candidate worthy with an almighty click</h5>
          <div className="playerScoreFlexBox">
            {Object.keys(this.props.submittedAnswers).map((key, index) => {
              return <div onClick={this.selectAnswer(key)} className="scoreText animated bounceInDown" key={index}>

                {/* instead here we will render each canvas */}
                <Canvas topText={this.props.submittedAnswers[key].topText} topXcoord={this.props.submittedAnswers[key].topXcoord} topYcoord={this.props.submittedAnswers[key].topYcoord} topFontSize={this.props.submittedAnswers[key].topFontSize} bottomText={this.props.submittedAnswers[key].bottomText} bottomXcoord={this.props.submittedAnswers[key].bottomXcoord} bottomYcoord={this.props.submittedAnswers[key].bottomYcoord} bottomFontSize={this.props.submittedAnswers[key].bottomFontSize} memeUrl={this.props.submittedAnswers[key].memeUrl} />

                </div>
            })}
          </div>
        </div>) : 
            <div>
                <h3>WINNING MEME:</h3>
                <div className="animated swing gameAnswerFlex">
                  <Canvas topText={this.state.winningMeme.topText} topXcoord={this.state.winningMeme.topXcoord} topYcoord={this.state.winningMeme.topYcoord} topFontSize={this.state.winningMeme.topFontSize} bottomText={this.state.winningMeme.bottomText} bottomXcoord={this.state.winningMeme.bottomXcoord} bottomYcoord={this.state.winningMeme.bottomYcoord} bottomFontSize={this.state.winningMeme.bottomFontSize} memeUrl={this.state.winningMeme.memeUrl} />
                </div>
      </div>}
    </div>
    )
  }
}
