import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';
import { CSSTransitionGroup } from 'react-transition-group';
import { getMemeStreamThunk } from '../store';
import Slider from 'react-image-slider';

/**
 * COMPONENT
 */
class MemeStream extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getMemeStreamThunk();
    }

    render() {
      return (
        <div className="memeSlider">
        <Slider images={this.props.memeStream} isInfinite delay={5000}>
          {this.props.memeStream.map((meme, key) => <div key={key}><img src={meme.imageUrl} /></div>)}
        </Slider>
        </div>
      );
    }



}

const mapStateToProps = function(state, ownProps) {
    return {
        memeStream: state.memeStream
    };
};

const mapDispatchToProps = dispatch => ({
    getMemeStreamThunk: () => dispatch(getMemeStreamThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(MemeStream);
