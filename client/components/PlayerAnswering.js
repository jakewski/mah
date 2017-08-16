import React from 'react';
import ReactDOM from 'react-dom';
import { Layer, Stage, Image, Text } from 'react-konva';
import socket from '../socket';

export default class PlayerAnswering extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            topText: '',
            topXcoord: 10,
            topYcoord: 10,
            bottomText: '',
            bottomXcoord: 10,
            bottomYcoord: 0,
            topFontSize: 40,
            bottomFontSize: 40,
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
        image.src = 'https://imgflip.com/s/meme/Futurama-Fry.jpg';
        image.onload = () => {
          this.setState({
            memeImg: image
          })
        this.setState({bottomYcoord: this.state.memeImg.height - 50})
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
      this.setState({topText: e.target.value});
    }

    bottomTxtChange = (e) => {
      this.setState({bottomText: e.target.value})
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
      let answer = [e.target.toptext.value, e.target.bottomtext.value]
      socket.emit('answerPosted', answer);
    }

    render() {
        return (
            <div>
              <div className="gameAnswerFlex">
                <form onSubmit={this.onMemeSubmit}>
                  <div className="form-group col-md-9 col-xs-12 col-lg-6" >
                    <input placeholder="top text" name="toptext" className="form-control formPlaceholder memeInput" id="formInputTop" onChange={this.topTxtChange}/>
                    <button className="btn btn-success center" onClick={this.onTopPlusClick}>+</button>
                    <button className="btn btn-danger center" onClick={this.onTopMinusClick}>-</button>

                    <input placeholder="bottom text" name="bottomtext" className="form-control formPlaceholder memeInput" id="formInputBottom" onChange={this.bottomTxtChange}/>
                    <button className="btn btn-success center" onClick={this.onBottomPlusClick}>+</button>
                    <button className="btn btn-danger center" onClick={this.onBottomMinusClick}>-</button>
                    <br />
                    <br />
                    <button type="submit" className="btn btn-success center">Submit</button>
                  </div>
                </form>

                {this.state.memeImg ?
                  <Stage height={this.state.memeImg.height} width={this.state.memeImg.width}>
                    <Layer>
                      <Image image={this.state.memeImg} />
                    </Layer>
                    <Layer>
                      <Text align='center' x={this.state.topXcoord} y={this.state.topYcoord} fontSize={this.state.topFontSize} fontFamily='Impact' fill='white' wrap='char' width={this.state.memeImg.width - 20} draggable={true} shadowColor='black' text={this.state.topText} onDragEnd={this.dragTop} />

                      <Text align='center' x={this.state.bottomXcoord} y={this.state.bottomYcoord} fontSize={this.state.bottomFontSize} fontFamily='Impact' fill='white' width={this.state.memeImg.width - 20} wrap='char' draggable={true} shadowColor='black' text={this.state.bottomText} onDragEnd={this.dragBottom}/>
                    </Layer>
                  </Stage>
                : <div />}
                </div>
            </div>);
    }
}
