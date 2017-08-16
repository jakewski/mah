import React from 'react'

export default class PlayerJudgement extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div> {/*player view when all answers are submitted  */}
        <h5>Submitted Meme-ories:</h5>
        <div className="playerScoreFlexBox">
          {Object.keys(this.props.submittedAnswers).map((key, index) => {
            return <button disabled className="scoreText" key={index}>{this.props.submittedAnswers[key]}</button>
          })}
        </div>
      </div>
    )
  }
}
