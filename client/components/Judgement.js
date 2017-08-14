import React from 'react'

export default class Judgement extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div> {/* judge view when all answers are submitted */}
        <div className="row">
          <h5>Wield your immense power and deem the proper candidate worthy with an almighty click</h5>
          <div className="playerScoreFlexBox">
            {this.props.submittedAnswers.map((answer, index) => {
              return <button className="scoreText" key={index}>{answer}</button>
            })}
          </div>
        </div>
    </div>
    )
  }
}
