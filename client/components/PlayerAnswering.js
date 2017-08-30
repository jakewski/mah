import React from 'react';
import ReactDOM from 'react-dom';
import { Layer, Stage, Image, Text } from 'react-konva';
import socket from '../socket';
import { connect } from 'react-redux';

class PlayerAnswering extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            height: 0,
            width: 0,
            topText: this.props.memeTopText ? this.props.memeTopText.toUpperCase() : '',
            topXcoord: 10,
            topYcoord: 10,
            bottomText: this.props.memeBottomText ? this.props.memeBottomText.toUpperCase() : '',
            bottomXcoord: 10,
            bottomYcoord: 0,
            topFontSize: 40,
            bottomFontSize: 40,
            memeUrl: this.props.memeUrl,
            memeImg: null, //DO NOT CHANGE THIS -- React-konva relies on the null keyword
        };

        this.topTxtChange = this.topTxtChange.bind(this);
        this.bottomTxtChange = this.bottomTxtChange.bind(this);
        this.dragTop = this.dragTop.bind(this);
        this.drgaBottom = this.dragBottom.bind(this);
        this.onMemeSubmit = this.onMemeSubmit.bind(this);
        this.onTopPlusClick = this.onTopPlusClick.bind(this);
        this.onTopMinusClick = this.onTopMinusClick.bind(this);
        this.onBottomPlusClick = this.onBottomPlusClick.bind(this);
        this.onBottomMinusClick = this.onBottomMinusClick.bind(this);
    }

    componentDidMount() {
        const image = new window.Image();
        image.src = this.state.memeUrl;
        image.onload = () => {
          if(window.innerWidth < 800) {
            this.setState({
              memeImg: image,
              height: image.height * .75,
              width: image.width * .75,
              topXcoord: this.state.topXcoord * .75,
              topYcoord: this.state.topYcoord * .75,
              topFontSize: this.state.topFontSize * .75,
              bottomXcoord: this.state.bottomXcoord * .75,
              bottomYcoord: (image.height * .75) - 40,
              bottomFontSize: this.state.bottomFontSize * .75,
            })
          } else {
            this.setState({
              memeImg: image,
              height: image.height,
              width: image.width,
              bottomYcoord: image.height - 50
            })
          }
        };
    }

    onTopPlusClick = (e) => {
      e.preventDefault();
      this.setState({topFontSize: this.state.topFontSize + 5});
    }

    onTopMinusClick = (e) => {
      e.preventDefault();
      this.setState({topFontSize: this.state.topFontSize - 5});
    }

    onBottomPlusClick = (e) => {
      e.preventDefault();
      this.setState({bottomFontSize: this.state.bottomFontSize + 5});
    }

    onBottomMinusClick = (e) => {
      e.preventDefault();
      this.setState({bottomFontSize: this.state.bottomFontSize - 5});
    }

    topTxtChange = (e) => {
      this.setState({topText: e.target.value.toUpperCase()});
    }

    bottomTxtChange = (e) => {
      this.setState({bottomText: e.target.value.toUpperCase()})
    }

    dragTop = (e) => {
      this.setState({
        topXcoord: e.target.attrs.x,
        topYcoord: e.target.attrs.y
      });
    }

    dragBottom = (e) => {
      this.setState({
        bottomXcoord: e.target.attrs.x,
        bottomYcoord: e.target.attrs.y
      })
    }

    onMemeSubmit = (e) => {
      //send almost entire state to db
      //we will recreate the memes via konva canvas on the slider
      e.persist();
      e.preventDefault();
      let answer = {};
      if(window.innerWidth < 800) {
        answer = {
          topText: this.state.topText,
          topXcoord: this.state.topXcoord / .75,
          topYcoord: this.state.topYcoord / .75,
          topFontSize: this.state.topFontSize / .75,
          bottomText: this.state.bottomText,
          bottomXcoord: this.state.bottomXcoord / .75,
          bottomYcoord: this.state.bottomYcoord / .75,
          bottomFontSize: this.state.bottomFontSize / .75,
          memeUrl: this.state.memeUrl
        }
      } else {
        answer = {
          topText: this.state.topText,
          topXcoord: this.state.topXcoord,
          topYcoord: this.state.topYcoord,
          topFontSize: this.state.topFontSize,
          bottomText: this.state.bottomText,
          bottomXcoord: this.state.bottomXcoord,
          bottomYcoord: this.state.bottomYcoord,
          bottomFontSize: this.state.bottomFontSize,
          memeUrl: this.state.memeUrl
        }
      }


      socket.emit('answerPosted', {answer, room: this.props.players.room, sessionId: this.props.players.player.sessionId });
    }

    render() {
      return (
        <div>
        {this.state.memeImg ?
              <div className="answeringFlex">
                <div className="animated bounceInDown stageWrapper">
                  <Stage height={this.state.height} width={this.state.width}>
                    <Layer>
                      <Image width={this.state.width} height={this.state.height} image={this.state.memeImg} />
                    </Layer>
                    <Layer>
                      <Text align='center' x={this.state.topXcoord} y={this.state.topYcoord} fontSize={this.state.topFontSize} fontFamily='Anton' fill='white' wrap='char' width={this.state.width - 20} draggable={true} shadowColor='black' text={this.state.topText} onDragEnd={this.dragTop} />

                      <Text align='center' x={this.state.bottomXcoord} y={this.state.bottomYcoord} fontSize={this.state.bottomFontSize} fontFamily='Anton' fill='white' width={this.state.width - 20} wrap='char' draggable={true} shadowColor='black' text={this.state.bottomText} onDragEnd={this.dragBottom}/>
                    </Layer>
                  </Stage>
                  </div>
                  <div className="row">
                  <form>
                  <div className="form-group memeForm" >

                    <div className="lineAndButtons">
                    <input name="toptext" className="input form-control memeInput" id="formInputTop" value={this.state.topText} placeholder="top text" onChange={this.topTxtChange}/>
                    <button className="memeButtons btn center plus" onClick={this.onTopPlusClick}>+</button>
                    <button className="memeButtons btn center minus" onClick={this.onTopMinusClick}>-</button>
                    </div>

                    <div className="lineAndButtons">
                    <input name="bottomtext" className="input form-control memeInput" id="formInputBottom" value={this.state.bottomText} placeholder="bottom text" onChange={this.bottomTxtChange}/>
                    <button className="memeButtons btn center plus" onClick={this.onBottomPlusClick}>+</button>
                    <button className="memeButtons btn center minus" onClick={this.onBottomMinusClick}>-</button>
                    </div>
                  </div>
                </form>
                </div>
                  <button onClick={this.onMemeSubmit} type="submit" className="btn center submit-meme-btn">SUBMIT</button>
                </div>
                : <div />}
            </div>);
    }
}
const mapStateToProps = function(state, ownProps) {
  return {
    players: state.players
  };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerAnswering);
