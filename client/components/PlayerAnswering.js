import React from 'react';
import ReactDOM from 'react-dom';
import { Layer, Stage, Image, Text } from 'react-konva';

export default class PlayerAnswering extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            topText: '',
            bottomText: '',
            memeImg: null, //DO NOT CHANGE THIS -- React-konva relies on the null keyword
            memeSize: {}
        };

        this.topTxtChange = this.topTxtChange.bind(this);
        this.bottomTxtChange = this.bottomTxtChange.bind(this);
    }

    componentDidMount() {
        const image = new window.Image();
        image.src = 'https://imgflip.com/s/meme/Futurama-Fry.jpg';
        image.onload = () => {
            this.setState({
                memeImg: image
            });

        };
    }

    topTxtChange = (e) => {
      this.setState({topText: e.target.value});
    }

    bottomTxtChange = (e) => {
      this.setState({bottomText: e.target.value})
    }

    render() {
      console.log(this.state)
        return (
            <div>
              <div className="gameAnswerFlex">
                <form>
                  <div className="form-group col-md-9 col-xs-12 col-lg-6" >
                    <input placeholder="top text" className="form-control formPlaceholder" id="formInputTop" onChange={this.topTxtChange}/>
                    <input placeholder="bottom text" className="form-control formPlaceholder" id="formInputBottom" onChange={this.bottomTxtChange}/>
                    <button type="submit" className="btn btn-success">Submit</button>
                  </div>
                </form>

                {this.state.memeImg ?
                  <Stage height={this.state.memeImg.height} width={this.state.memeImg.width}>
                    <Layer>
                      <Image image={this.state.memeImg} />
                    </Layer>
                    <Layer>
                      <Text x={10} y={10} fontSize={40} fontFamily='Impact' fill='white' allign='center' text={this.state.topText}/>
                      <Text x={10} y={this.state.memeImg.height - 50} fontSize={40} fontFamily='Impact' fill='white' allign='center' text={this.state.bottomText}/>
                    </Layer>
                  </Stage>
                : <div />}
                </div>
            </div>);
    }
}
