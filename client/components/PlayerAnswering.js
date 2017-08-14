import React from 'react'

export default class PlayerJudgement extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div> {/*player view when they have not answered yet  */}
        <form className="gameAnswerFlex">

          <div className="col-lg-6 col-md-6 col-sm-6" style={divStyle}>

            <img className="img-responsive center-block" src={this.props.memeUrl} />

            <div className="form-group col-md-9 col-xs-12 col-lg-6" >
              <textarea placeholder="me me" className="form-control formPlaceholder" id="formInputTop" rows="1" />
              <textarea placeholder="me me" className="form-control formPlaceholder" id="formInputBottom" rows="1" />
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
