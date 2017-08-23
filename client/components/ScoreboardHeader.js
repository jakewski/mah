import React from 'react';

const ScoreboardHeader = (props) => {
  return (
    <div>
      <div className="row">
        <div className="round-timer-container">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 round-category-div">
            <h2 className="round">ROUND {props.turnNumber + 1}:</h2>
            <h2 className="category">{props.category}</h2>
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 timer-div">
            <h1 className="timer">:{props.currentTimer / 1000 || '?'}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScoreboardHeader;
