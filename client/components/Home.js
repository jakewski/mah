import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import socket from '../socket';
import { CSSTransitionGroup } from 'react-transition-group';
import ChatBox from './ChatBox'
import Instructions from './Instructions'

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
        socket.emit('switchToMain');
    }

    toggleInstructions(){
        this.setState(prev => ({ showInstructions: !prev.showInstructions }));
    }

    render() {
        return (
            <div className="container">
              <svg className="logoBanner" height="600px" id="Layer_1" width="1600px"
                version="1.1" viewBox="0 0 1600 600" x="0px" y="0px" xmlSpace="preserve">
                <rect height="281.575" width="1115.393" fill="none" x="270.491" y="94.25"/>
                <text fill="#FFFFFF" fontFamily="'Lobster'" fontSize="400"
                transform="matrix(1 0 0 1 270.4912 374.3281)">memes</text>
                <polygon fill="#FF9933" points="1562.822,493.383 816.499,493.383 70.175,493.383 70.175,300 70.175,106.618 816.499,106.618&#xA;     1562.822,106.618 1442.822,300 "/>
                <rect height="281.575" width="1115.393" fill="none" x="279.492" y="85.755"/>
                <text fill="#FFFFFF" fontFamily="'Lobster'" fontSize="400" transform="matrix(1 0 0 1 279.4922 365.833)">memes</text>
                <rect height="281.575" width="1115.393" fill="none" x="271.491" y="79.753"/>
                <text fill="#319999" fontFamily="'Lobster'" fontSize="400" transform="matrix(1 0 0 1 271.4912 359.8311)">memes</text>
                <rect height="96.126" width="1012.075" fill="none" x="286.491" y="375.825"/>
                <text className="heeboFont" fontWeight="900" fill="#CC3232" fontFamily="'Heebo'" fontSize="100" transform="matrix(1 0 0 1 286.4912 450.8252)">AGAINST HUMANITY</text>
              </svg>
                <CSSTransitionGroup transitionName="fadeIn" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                    <div className="row">
                    <div className="col-sm-1 col-md-1 col-lg-1"/>
                        <div className="col-sm-4 col-md-4 col-lg-4 text-center buttonBox">
                            <NavLink to="/create">
                                <button type="button" className="btn homeBtns">
                                    Create Game
                                </button>
                            </NavLink>
                            <br />
                            <br />
                            <br />
                            <NavLink to="/join">
                                <button type="button" className="btn homeBtns">
                                    Join Game
                                </button>
                            </NavLink>
                            <br />
                            <br />
                            <br />
                        </div>
                        <div className="col-xs-12 col-sm-7 col-md-7 col-lg-7 marginBottom chatWrapper">
                            <ChatBox />
                        </div>
                    </div>

                    <button type="button" onClick={this.toggleInstructions} className="btn btn-info">
                            {this.state.showInstructions ? 'Hide Instructions' : 'How to Play'}
                    </button>

                    <div className="col-sm-12 col-md-12 col-lg-12 marginTop">
                       <Instructions showInstructions={this.state.showInstructions} />
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
