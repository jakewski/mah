import React, { Component } from "react";
import { connect } from "react-redux";
import socket from "../socket";
import { emojify } from "react-emojione";

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{ body: "You've connected to the room!", from: "MemeBot" }],
      thisMessage: "",
      showEmojis: false,
    };
  }

  componentDidMount() {
    socket.on("message", message => {
      this.setState(function(oldState) {
        return { messages: [...oldState.messages, message] };
      });
    });
  }


  componentWillUnmount() {
    socket.removeListener("message");
  }

  componentDidUpdate() {
    // get the messagelist container and set the scrollTop to the height of the container
    const objDiv = document.getElementsByClassName("messagesUl");
    objDiv[0].scrollTop = objDiv[0].scrollHeight;
  }

  toggleEmojis = () => {
    this.setState(prev => ({ showEmojis: !prev.showEmojis }));
  }

  handleChange = event => {
    this.setState({ thisMessage: event.target.value });
  }

  appendEmoji = emoji => () => {
    this.setState(prev => ({ thisMessage: `${prev.thisMessage}${emoji}`}));
  }

  handleKeyPress = (target) => {
    if(target.charCode==13){
      this.handleSubmit(target)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const body = this.state.thisMessage;
    const message = {
      body,
      from: "Me"
    };
    this.setState({ messages: [...this.state.messages, message], thisMessage: ''});
    socket.emit("message", { body, room: this.props.players.room, from: this.props.players.player.name });
    this.state.thisMessage = "";
  
  };

  emojiInput() {
    const emojis = [
      ":smile:",
      ":laughing:",
      ":blush:  ",
      ":heart_eyes:",
      ":wink:",
      ":anguished:",
      ":cry:",
      ":joy:",
      ":smiling_imp:",
      ":heart:",
      ":boom:",
      ":fire:",
      ":thumbsup:",
      ":thumbsdown:",
      ":ok_hand:",
      ":100:",
      ":dash:",
      ":angry:",
      ":rage:",
      ":fearful:",
      ":sunglasses:",
      ":disappointed_relieved:",
      ":stuck_out_tongue_winking_eye:",
      ":sweat:",
      ":expressionless:",
      ":raised_hands:",
      ":sweat_smile:",
      ":kissing_heart:",
      ":kissing:",
      ":smirk:",
      ":eyes:",
    ];

    return emojis.map((emoji, i) =>
      <div key={i} className="emojiButton hvr-grow" onClick={this.appendEmoji(emoji)}>
        {emojify(emoji)}
      </div>
    );
  }

  render() {
    const messages = this.state.messages.map((message, index) => {
      if (message) {
        return (
          <li className="messageLi animated bounceIn" key={index}>
            <b className="messageFrom">
              {message.from}: {" "}
            </b>
            <b className="message">
              {emojify(message.body)}
            </b>
          </li>
        );
      } else {
        return <div />;
      }
    });

    return (
      <div className="chatbox max-width-850">
        {this.state.showEmojis ? <div className="chatinput row emojiRow">
          {this.emojiInput()}
        </div> : null }
        <div>
          <form className="chat-input-flex" onSubmit={this.handleSubmit}>
            <textarea className="chatinput" type="text" value={this.state.thisMessage} placeholder="Enter message..." onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <button type="submit" className="btn chatButton">SEND</button>
            <div onClick={this.toggleEmojis} className="btn emojiButton">: )</div>
          </form>
        </div>
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

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
