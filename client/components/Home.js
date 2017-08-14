import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import socket from '../socket';
import { CSSTransitionGroup } from 'react-transition-group';
import ChatBox from './ChatBox'

/**
 * COMPONENT
 */
class Home extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        socket.emit('switchToMain');
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
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <ChatBox />
                        </div>
                    </div>
                </CSSTransitionGroup>
            </div>
        );
    }
}

const mapStateToProps = function(state, ownProps) {
  return {
    player: state.players.player
  }
}

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Home)
