import React from 'react'

export default class JudgeWaiting extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div className="center-items-flex"> {/*judge view when waiting on all answers  */}
          <h5 className="center-text">...Waiting for player submissions</h5>
          <img className="animated bounceInDown center-block" src="https://media.tenor.com/images/c3133e236670d969de3b493b1be783b0/tenor.gif" style={{ margin: '5px' }} />
      </div>
    )
  }
}
