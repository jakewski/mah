import React from 'react';
import socket from '../socket';
import Canvas from './Canvas';
import axios from 'axios';

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
      axios.post('/api/winninganswers', this.state.winningMeme);
    })
    
  }

  componentWillUnmount(){
    socket.removeListener('roundFinishedPlayer');
  }

  render(){
    return (
      <div> {/*player view when all answers are submitted  */}
        { !this.state.winningMeme ? <div>
        <h3 className="memeories">Submitted Meme-ories:</h3>
        <div className="playerScoreFlexBox">
          {(this.props.submittedAnswers && Object.keys(this.props.submittedAnswers).length) ? Object.keys(this.props.submittedAnswers).map((key, index) => {
            return <div className="scoreText animated bounceInDown" key={index}>

                {/* instead here we will render each canvas */}
                <Canvas topText={this.props.submittedAnswers[key].topText} topXcoord={this.props.submittedAnswers[key].topXcoord} topYcoord={this.props.submittedAnswers[key].topYcoord} topFontSize={this.props.submittedAnswers[key].topFontSize} bottomText={this.props.submittedAnswers[key].bottomText} bottomXcoord={this.props.submittedAnswers[key].bottomXcoord} bottomYcoord={this.props.submittedAnswers[key].bottomYcoord} bottomFontSize={this.props.submittedAnswers[key].bottomFontSize} memeUrl={this.props.submittedAnswers[key].memeUrl} />

                </div>
          }) : <h3>...seriously? no one submitted anything?</h3>}
        </div>
      </div> : <div>
                <h2 className="winningMeme">WINNING MEME:</h2>
                <div className="animated swing gameAnswerFlex">
                  <Canvas topText={this.state.winningMeme.topText} topXcoord={this.state.winningMeme.topXcoord} topYcoord={this.state.winningMeme.topYcoord} topFontSize={this.state.winningMeme.topFontSize} bottomText={this.state.winningMeme.bottomText} bottomXcoord={this.state.winningMeme.bottomXcoord} bottomYcoord={this.state.winningMeme.bottomYcoord} bottomFontSize={this.state.winningMeme.bottomFontSize} memeUrl={this.state.winningMeme.memeUrl} />
                </div>
            </div>
    }
    </div>)
  }
}
