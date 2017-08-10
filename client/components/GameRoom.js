import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import socket from '../socket'
import { NavLink } from 'react-router-dom'


class GameRoom extends Component {
  constructor(){
    super();
    this.state = {
      gameId: ''
    }
  }

  componentDidMount() {
    socket.on('getCode', (code) => {
      this.setState({gameId: code})
    })
  }

  render() {
    let currentLeader = false
    let playerNames = ['Brion', 'Jakubucci', 'Ann', 'Madelean']
    let gameRoomName = 'Bad Boys and Girls of America'
    let currentJudgeIndex = 0
    let memeUrl = 'https://imgflip.com/s/meme/Futurama-Fry.jpg'
    return (
      <CSSTransitionGroup transitionName="fadeIn" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={0} transitionLeaveTimeout={0}>

        <div key="transition" className="container-fluid">
          <h3 style={{marginTop: 0}} >{gameRoomName}</h3>
          <div className="row">
            <div className="col-xs-6">
              <h5>Turn Number: 35</h5>
            </div>
            <div className="col-xs-6">
              <h5>Current Judge: {playerNames[currentJudgeIndex]}</h5>
            </div>
          </div>
          <hr />
          {/*className="col-xs-4 col-lg-2"  */}
          <div className="row">
            <div className="playerScoreFlexBox">
              {playerNames.map((player, index) => {
                return <div id={index}>{player}: ##</div>
              })}
            </div>
          </div>
          <hr />
          <div className="row">
            <img className="img-responsive center-block" src={memeUrl} />
          </div>
          <div className="row">
            {currentLeader ?
            <div>hello leader</div> : <div>
              <form>

              </form>
              </div>}
          </div>
          <p>test rando test meme meme memememememe test rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememetest rando test meme meme memememememe</p>
        </div>

      </CSSTransitionGroup>
    )
  }
}

// turn and scoreboard
// current meme and current info
// controls for current leader, ternary operator

const mapStateToProps = function(state, ownProps) {
  return {}
}

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom)
