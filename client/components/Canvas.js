import React from 'react';
import ReactDOM from 'react-dom';
import { Layer, Stage, Image, Text } from 'react-konva';
import socket from '../socket';

export default function(props) {
            // topText: '',
            // topXcoord: 0,
            // topYcoord: 0,
            // bottomText: '',
            // bottomXcoord: 0,
            // bottomYcoord: 0,
            // topFontSize: 0,
            // bottomFontSize: 0,
            // memeImg: null, //DO NOT CHANGE THIS -- React-konva relies on the null keyword

  const {topText, topXcoord, topYcoord, topFontSize, bottomText, bottomXcoord, bottomYcoord, bottomFontSize, imageUrl} = props;

  const image = new window.Image();
  image.src = imageUrl;
  image.onload = () => {
    const memeImg = image
  }

  return (
    <div>
        {memeImg ?
          <Stage height={memeImg.height} width={memeImg.width}>
            <Layer>
              <Image image={memeImg} />
            </Layer>
            <Layer>
              <Text align='center' x={topXcoord} y={topYcoord} fontSize={topFontSize} fontFamily='Impact' fill='white' wrap='char' width={memeImg.width - 20} shadowColor='black' text={topText} />

              <Text align='center' x={bottomXcoord} y={bottomYcoord} fontSize={bottomFontSize} fontFamily='Impact' fill='white' width={memeImg.width - 20} wrap='char' shadowColor='black' text={bottomText} />
            </Layer>
          </Stage>
        : <div />}
    </div>);
}
