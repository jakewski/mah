import React from 'react';
import socket from "../socket";

export default class Judgement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      judged: false,
      winningMeme: '',
    }
    this.selectAnswer = this.selectAnswer.bind(this);
  }

  selectAnswer(key){
    let tempThis = this;
    return function(){
      socket.emit('winningMeme', key)
      socket.on('roundFinished', winningMeme => {
        console.log(winningMeme);
        tempThis.setState({ judged: true, winningMeme: winningMeme });

      })
    }
  }

  render(){
    return (
      <div> {/* judge view when all answers are submitted */}
        { !this.state.judged ? (<div className="row">
          <h5>Wield your immense power and deem the proper candidate worthy with an almighty click</h5>
          <div className="playerScoreFlexBox">
            {Object.keys(this.props.submittedAnswers).map((key, index) => {
              return <button onClick={this.selectAnswer(key)} className="scoreText" key={index}>{this.props.submittedAnswers[key]}</button>
            })}
          </div>
        </div>) : <div>WINNING MEME: {this.state.winningMeme.text}</div>}
    </div>
    )
  }
}
