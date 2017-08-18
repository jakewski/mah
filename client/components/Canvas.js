import React from 'react';
import ReactDOM from 'react-dom';
import { Layer, Stage, Image, Text } from 'react-konva';
import socket from '../socket';

export default class Canvas extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
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
        memeImg: image
      })
    };
  }

  render() {

  return (
    <div>
        {this.state.memeImg ?
          <Stage height={this.state.memeImg.height} width={this.state.memeImg.width}>
            <Layer>
              <Image image={this.state.memeImg} />
            </Layer>
            <Layer>
              <Text align='center' x={this.state.topXcoord} y={this.state.topYcoord} fontSize={this.state.topFontSize} fontFamily='Impact' fill='white' wrap='char' width={this.state.memeImg.width - 20} shadowColor='black' text={this.state.topText} />

              <Text align='center' x={this.state.bottomXcoord} y={this.state.bottomYcoord} fontSize={this.state.bottomFontSize} fontFamily='Impact' fill='white' width={this.state.memeImg.width - 20} wrap='char' shadowColor='black' text={this.state.bottomText} />
            </Layer>
          </Stage>
        : <div />}
    </div>);
  }
}
