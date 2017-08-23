import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import socket from '../socket';
import { CSSTransitionGroup } from 'react-transition-group';
import ChatBox from './ChatBox'
import Instructions from './Instructions'
import { setRoom } from '../store'
import axios from 'axios'
import history from "../history";

/**
 * COMPONENT
 */
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInstructions: true,
        }
        this.toggleInstructions = this.toggleInstructions.bind(this);
        this.resumeGame = this.resumeGame.bind(this);
    }


    componentDidMount() {
        axios.get('/api/room')
        .then(res => {
            if (res.data.room && res.data.room !== 'main'){
                this.setState({ inGame: res.data.room })
            }
            socket.emit('switchToMain', this.props.players.room);
            this.props.setRoom({id: 'main'})
            // axios.post('/api/room', {room: 'main'})
            // .catch(err => console.log(err))
        })
    }
    toggleInstructions(){
        this.setState(prev => ({ showInstructions: !prev.showInstructions }));
    }

    resumeGame() {
        socket.emit('switchToRoom', this.state.inGame);
        this.props.setRoom({id: this.state.inGame})
        axios.post('/api/room', {room: this.state.inGame})
        .then(() => history.push('/room'))
        .catch(err => console.log(err))
    }
    
    render() {
        return (
            <div className="container">
                <CSSTransitionGroup transitionName="fadeIn" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12 text-center buttonBox">
                            <NavLink to="/create">
                                <button type="button" className="btn homeBtns">
                                    CREATE GAME
                                </button>
                            </NavLink>
                            <br />
                            <br />
                            <br />
                            <NavLink to="/join">
                                <button type="button" className="btn homeBtns">
                                    JOIN GAME
                                </button>
                            </NavLink>
                            <br />
                            <br />
                            <br />
                            {this.state.inGame ?
                                <button type="button" onClick={this.resumeGame} className="btn btn-success larger">
                                    Resume Game {this.state.inGame}
                                </button> : null
                            }
                            <br />
                            <br />
                            <br />
                        </div>
                        <div className="col-xs-12 col-sm-7 col-md-7 col-lg-7 marginBottom chatWrapper">
                            <ChatBox />
                        </div>
                    </div>
                    <hr />
                    <button type="button" onClick={this.toggleInstructions} className="btn btn-info">
                            {this.state.showInstructions ? 'Hide Instructions' : 'How to Play'}
                    </button>
                    <hr />
                    <div className="col-sm-12 col-md-12 col-lg-12">
                       <Instructions showInstructions={this.state.showInstructions} />
                    </div>
                </CSSTransitionGroup>
            </div>
        );
    }
}

const mapStateToProps = function(state, ownProps) {
  return {
    player: state.players.player,
    players: state.players,
    room: state.players.room,
  }
}

const mapDispatchToProps = dispatch => ({
    setRoom: code => dispatch(setRoom(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)
