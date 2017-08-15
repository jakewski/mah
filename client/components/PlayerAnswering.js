import React from 'react'
import socket from '../socket'

export default class PlayerAnswering extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.persist();
    event.preventDefault();
    let answer = [event.target.toptext.value, event.target.bottomtext.value]
    socket.emit('answerPosted', answer);
  }

  render(){
    return (
      <div> {/*player view when they have not answered yet  */}
        <form className="gameAnswerFlex" onSubmit={this.handleSubmit}>

          <div className="col-lg-6 col-md-6 col-sm-6">

            <img className="img-responsive center-block" src={this.props.memeUrl} />

            <div className="form-group col-md-9 col-xs-12 col-lg-6" >
              <textarea placeholder="me me" className="form-control formPlaceholder" name="toptext" id="formInputTop" rows="1" />
              <textarea placeholder="me me" className="form-control formPlaceholder" name="bottomtext" id="formInputBottom" rows="1" />
            </div>
            <div className="row">
              <button type="submit" className="btn btn-success">Submit</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
