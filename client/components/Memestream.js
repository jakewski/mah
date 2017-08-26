import React, { Component } from 'react';
import { connect } from 'react-redux';
import Canvas from './Canvas';
import axios from 'axios';
import { CSSTransitionGroup } from 'react-transition-group';

class Memestream extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            memes: [],
            selected: 0
        };
    }

    componentDidMount() {
        axios.get('/api/winninganswers').then(res => res.data).then(memes => this.setState({ memes: memes }));

        setInterval(() => {
            this.setState(() => {
                console.log('setting state');
                return { selected: Math.floor(Math.random() * this.state.memes.length) };
            });
        }, 5000);
    }

    render() {
        const populated = this.state.memes.length > 1;
        const selected = this.state.selected;
        return (
            <div>{populated
                ? <CSSTransitionGroup transitionName="fadeIn" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                <div className="container streamContainer">
                    <div className="row">
                      <Canvas
                          topText={this.state.memes[selected].topText}
                          topXcoord={this.state.memes[selected].topXcoord}
                          topYcoord={this.state.memes[selected].topYcoord}
                          topFontSize={this.state.memes[selected].topFontSize}
                          bottomText={this.state.memes[selected].bottomText}
                          bottomXcoord={this.state.memes[selected].bottomXcoord}
                          bottomYcoord={this.state.memes[selected].bottomYcoord}
                          bottomFontSize={this.state.memes[selected].bottomFontSize}
                          memeUrl={this.state.memes[selected].memeUrl}
                      />
                    </div>
                    <div className="row">
                      <button className="btn glyphicon glyphicon-thumbs-up" />
                      <button className="btn glyphicon glyphicon-thumbs-down" />
                    </div>
                  </div>
                </CSSTransitionGroup>
                : <div />}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = function(state, ownProps) {
    return {
        memes: state.memes,
        selectedMeme: state.selectedMeme
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Memestream);
