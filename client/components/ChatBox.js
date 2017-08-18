import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';

class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    componentDidMount() {
        socket.on('message', message => {
            this.setState(function(oldState) {
              return { messages: [...oldState.messages, message] }
            });
        });
    }

    componentDidUpdate() {
    // get the messagelist container and set the scrollTop to the height of the container
    const objDiv = document.getElementsByClassName('messagesUl');
    objDiv[0].scrollTop = objDiv[0].scrollHeight;
  }

    handleSubmit = event => {
        const body = event.target.value;
        if (event.keyCode === 13 && body) {
            const message = {
                body,
                from: 'Me'
            };
            this.setState({ messages: [...this.state.messages, message] });
            socket.emit('message', body);
            event.target.value = '';
        }
    };

    render() {
        const messages = this.state.messages.map((message, index) => {
            if (message) {
                return (
                    <li className="messageLi" key={index}>
                        <b className="messageFrom">
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
            <div className="chatbox col-sm-12 col-md-12 col-lg-12">
                <input className="chatinput" type="text" placeholder="Enter a message..." onKeyUp={this.handleSubmit} />
                <div className="messagesUl">
                  {messages}
                </div>
            </div>
        );
    }
}

export default ChatBox;
