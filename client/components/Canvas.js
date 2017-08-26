import React from 'react';
import ReactDOM from 'react-dom';
import { Layer, Stage, Image, Text } from 'react-konva';
import socket from '../socket';

export default class Canvas extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      width: 0,
      topText: this.props.topText,
      topXcoord: this.props.topXcoord,
      topYcoord: this.props.topYcoord,
      topFontSize: this.props.topFontSize,
      bottomText: this.props.bottomText,
      bottomXcoord: this.props.bottomXcoord,
      bottomYcoord: this.props.bottomYcoord,
      bottomFontSize: this.props.bottomFontSize,
      memeUrl: this.props.memeUrl,
      memeImg: null
    }
  }

  componentDidMount() {

    const image = new window.Image();
    image.src = this.state.memeUrl;
    image.onload = () => {
      this.setState({
        memeImg: image,
        height: image.height * .75,
        width: image.width * .75,
        topxCoord: this.state.topXcoord * .75,
        topYcoord: this.state.topYcoord * .75,
        topFontSize: this.state.topFontSize * .75,
        bottomXcoord: this.state.bottomXcoord * .75,
        bottomYcoord: this.state.bottomYcoord * .75,
        bottomFontSize: this.state.bottomFontSize * .75
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    const image = new window.Image();
    image.src = this.nextProps.memeUrl;
    image.onload = () => {
      this.setState({
        memeImg: image,
        height: image.height * .75,
        width: image.width * .75,
        topText: nextProps.topText,
        topXcoord: nextProps.topXcoord * .75,
        topYcoord: nextProps.topYcoord * .75,
        topFontSize: nextProps.topFontSize * .75,
        bottomText: nextProps.bottomText,
        bottomXcoord: nextProps.bottomXcoord * .75,
        bottomYcoord: nextProps.bottomYcoord * .75,
        bottomFontSize: nextProps.bottomFontSize * .75,
        memeUrl: nextProps.memeUrl
      });
    }
  }

  render() {
  return (
    <div className="stageWrapper">
        {this.state.memeImg ?
          <Stage height={this.state.height} width={this.state.width}>
            <Layer>
              <Image height={this.state.height} width={this.state.width} image={this.state.memeImg} />
            </Layer>
            <Layer>
              <Text align='center' x={this.state.topXcoord} y={this.state.topYcoord} fontSize={this.state.topFontSize} fontFamily='Impact' fill='white' wrap='char' width={this.state.width - 20} shadowColor='black' text={this.state.topText} />

              <Text align='center' x={this.state.bottomXcoord} y={this.state.bottomYcoord} fontSize={this.state.bottomFontSize} fontFamily='Impact' fill='white' width={this.state.width - 20} wrap='char' shadowColor='black' text={this.state.bottomText} />
            </Layer>
          </Stage>
        : <div />}
    </div>);
  }
}
