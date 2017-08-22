import React, { Component } from 'react';
const Instructions = props =>
    (<div className={`row animated instructions ${props.showInstructions ? 'bounceIn' : 'bounceOut'}`}>
        <div className="col-md-4">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4><i className="fa fa-fw fa-check"></i> Create a Game</h4>
                </div>
                <div className="panel-body">
                    <p className="instructions">Pick the categories you would like to see, the number of players, and you will be assigned a game code. Distribute the code amongst your friends so they can join the game! </p>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4><i className="fa fa-fw fa-gift"></i> Join a Game</h4>
                </div>
                <div className="panel-body">
                    <p>If a friend has already made a game, retrieve the game code from them and enter it in the Join Game screen</p>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4><i className="fa fa-fw fa-compass"></i> Play! </h4>
                </div>
                <div className="panel-body">
                    <p>Once the host chooses to start the game, they will be assigned as the first judge and the rest of the players will recieve a meme and category. The objective of the game is to come up with the funniest possible meme that relates to the given category. Once all players submit their answers, the judge will pick the one he finds funniest, and the person who made it gains a point.</p>
                </div>
            </div>
        </div>
    </div>)

export default Instructions;
