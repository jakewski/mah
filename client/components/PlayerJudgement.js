import React from 'react';
import socket from '../socket';
import Canvas from './Canvas';

export default class PlayerJudgement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winningMeme: undefined,
    }
  }

  componentDidMount(){
    socket.on('roundFinishedPlayer', winningMeme => {
      this.setState({ winningMeme: winningMeme });
    })
  }

  componentWillUnmount(){
    socket.removeListener('roundFinishedPlayer');
  }

  render(){
    return (
      <div> {/*player view when all answers are submitted  */}
        { !this.state.winningMeme ? <div>
        <h5>Submitted Meme-ories:</h5>
        <div className="playerScoreFlexBox">
          {Object.keys(this.props.submittedAnswers).map((key, index) => {
            return <div className="scoreText animated bounceInDown" key={index}>

                {/* instead here we will render each canvas */}
                <Canvas topText={this.props.submittedAnswers[key].topText} topXcoord={this.props.submittedAnswers[key].topXcoord} topYcoord={this.props.submittedAnswers[key].topYcoord} topFontSize={this.props.submittedAnswers[key].topFontSize} bottomText={this.props.submittedAnswers[key].bottomText} bottomXcoord={this.props.submittedAnswers[key].bottomXcoord} bottomYcoord={this.props.submittedAnswers[key].bottomYcoord} bottomFontSize={this.props.submittedAnswers[key].bottomFontSize} memeUrl={this.props.submittedAnswers[key].memeUrl} />

                </div>
          })}
        </div>
      </div> : <div>
                <h3>WINNING MEME:</h3>
                <div className="animated swing gameAnswerFlex">
                  <Canvas topText={this.state.winningMeme.topText} topXcoord={this.state.winningMeme.topXcoord} topYcoord={this.state.winningMeme.topYcoord} topFontSize={this.state.winningMeme.topFontSize} bottomText={this.state.winningMeme.bottomText} bottomXcoord={this.state.winningMeme.bottomXcoord} bottomYcoord={this.state.winningMeme.bottomYcoord} bottomFontSize={this.state.winningMeme.bottomFontSize} memeUrl={this.state.winningMeme.memeUrl} />
                </div>
            </div>
    }
    </div>)
  }
}
