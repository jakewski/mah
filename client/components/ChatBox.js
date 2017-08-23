import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';

class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [{body: "You've connected to the room!", from: 'MemeBot'}]
        };
    }

    componentDidMount() {
        socket.on('message', message => {
            this.setState(function(oldState) {
              return { messages: [...oldState.messages, message] }
            });
        });
    }

    componentWillUnmount() {
        socket.removeListener('message');
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
            socket.emit('message', {body, room: this.props.players.room, from: this.props.players.player.name});
            event.target.value = '';
        }
    };

    render() {
        const messages = this.state.messages.map((message, index) => {
            if (message) {
                return (
                  <li className="messageLi animated bounceIn" key={index}>
                    <b className="messageFrom">
                      {message.from}: {' '}
                    </b>
                    <b className="message">
                      {message.body}
                    </b>
                  </li>
                );
            } else {
                return <div />;
            }
        });

        return (
            <div className="chatbox">
                <input className="chatinput" type="text" placeholder="Enter a message..." onKeyUp={this.handleSubmit} />
                <div className="messagesUl">
                  {messages}
                </div>
            </div>
        );
    }
}
const mapStateToProps = function(state, ownProps) {
    return {
      players: state.players
    };
  };

  const mapDispatchToProps = dispatch => ({

  });

  export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
