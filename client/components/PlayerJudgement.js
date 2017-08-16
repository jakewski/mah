import React from 'react';
import socket from '../socket';

export default class PlayerJudgement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winningMeme: undefined,
    }
  }

  componentDidMount(){
    socket.on('roundFinishedPlayer', winningMeme => {
        console.log(winningMeme);
        this.setState({ winningMeme: winningMeme.join(' | ') });
    })
  }

  componentWillUnmount(){
    socket.removeListener('roundFinishedPlayer');
  }

  render(){
    return (
      !this.state.winningMeme ? (<div> {/*player view when all answers are submitted  */}
        <h5>Submitted Meme-ories:</h5>
        <div className="playerScoreFlexBox">
          {Object.keys(this.props.submittedAnswers).map((key, index) => {
            return <button disabled className="scoreText" key={index}>{this.props.submittedAnswers[key]}</button>
          })}
        </div>
      </div>) : <div>WINNING MEME: {this.state.winningMeme}</div>
    )
  }
}
