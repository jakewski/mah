import React from 'react'

export default class JudgeWaiting extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div> {/*judge view when waiting on all answers  */}
        <div className="row">
          <h5>Waiting on the plebs. Have mercy, good lord</h5>
          <img src="https://media.tenor.com/images/c3133e236670d969de3b493b1be783b0/tenor.gif" style={{ margin: '5px' }} />
        </div>
      </div>
    )
  }
}
