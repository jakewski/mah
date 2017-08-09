import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import socket from '../socket';

/**
 * COMPONENT
 */
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    componentDidMount() {
        socket.on('message', message => {
            this.setState({ messages: [message, ...this.state.messages] });
        });
    }

    handleSubmit = event => {
        const body = event.target.value;
        if (event.keyCode === 13 && body) {
            const message = {
                body,
                from: 'Me'
            };
            this.setState({ messages: [message, ...this.state.messages] });
            socket.emit('message', body);
            event.target.value = '';
        }
    };

    render() {
      console.log(this.state)
        const messages = this.state.messages.map((message, index) => {
            if (message) {
                return (
                    <li key={index}>
                        <b>
                            {message.from}: {' '}
                        </b>
                        {message.body}
                    </li>
                );
            } else {
                return <div />;
            }
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-6">
                        <input type="text" placeholder="Enter a message..." onKeyUp={this.handleSubmit} />
                        {messages}
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6 text-center">
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
                </div>
            </div>
        );
    }

}

export default Home;
