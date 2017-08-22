import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import socket from '../socket';
import { CSSTransitionGroup } from 'react-transition-group';
import ChatBox from './ChatBox'
import Instructions from './Instructions'
import { setRoom } from '../store'
import axios from 'axios'

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
    }


    componentDidMount() {
        socket.emit('switchToMain', this.props.players.room);
        this.props.setRoom({id: 'main'})
        axios.post('/api/room', {room: 'main'})
        .catch(err => console.log(err))
    }

    toggleInstructions(){
        this.setState(prev => ({ showInstructions: !prev.showInstructions }));
    }

    render() {
        return (
            <div className="container">
                <CSSTransitionGroup transitionName="fadeIn" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6 text-center buttonBox">
                            <NavLink to="/create">
                                <button type="button" className="btn btn-success larger">
                                    Create Game
                                </button>
                            </NavLink>
                            <br />
                            <br />
                            <br />
                            <NavLink to="/join">
                                <button type="button" className="btn btn-success larger">
                                    Join Game
                                </button>
                            </NavLink>
                            <br />
                            <br />
                            <br />
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
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
    players: state.players
  }
}

const mapDispatchToProps = dispatch => ({
    setRoom: code => dispatch(setRoom(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)
