import React, { Component } from 'react'

export default class PlayerWaiting extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div> {/*player view when they have answered, but others haven't  */}
        <div className="row">
          <h5>Answer submitted, awaiting responses and judge's decision</h5>
          <img className="animated bounceInDown" src="https://media.tenor.com/images/cc6658b83d611b906386f779cf37ab0c/tenor.gif" style={{ margin: '5px' }} />
        </div>
      </div>
    )
  }
}
