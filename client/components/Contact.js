import React from 'react';


const Contact = () => {
  return (
    <div className="contact-flex">
      <div className="contact-header-flex">
        <h3 className="blue contact-info"><a className="contact-link" href="https://github.com/jakewski/mah">PROJECT REPO</a></h3>
      </div>
        <div className="contact-container">
          <div className="contact-div">
            <h3 className="contact-name">BRIAN CARLISLE</h3>
            <h5 className="blue contact-info"><a className="contact-link" target="_blank" href="https://www.linkedin.com/in/carlislebrian/">linkedin</a></h5>
            <h5 className="contact-info contact-divider">|</h5>
            <h5 className="blue contact-info"><a className="contact-link" target="_blank" href="https://github.com/knightofknee">github</a></h5>
          </div>
          <div className="contact-div">
            <h3 className="contact-name">JAKUB GRZEGORZEWSKI</h3>
            <h5 className="blue contact-info"><a className="contact-link" target="_blank" href="https://www.linkedin.com/in/jakub-grzegorzewski-020443129/">linkedin</a></h5>
            <h5 className="contact-info contact-divider">|</h5>
            <h5 className="blue contact-info"><a className="contact-link" target="_blank" href="https://github.com/jakewski">github</a></h5>
          </div>
          <div className="contact-div">
            <h3 className="contact-name">ANNE MARIE KING</h3>
            <h5 className="blue contact-info"><a className="contact-link" target="_blank" href="https://amking23.github.io/">website</a></h5>
            <h5 className="contact-info contact-divider">|</h5>
            <h5 className="blue contact-info"><a className="contact-link" target="_blank" href="https://www.linkedin.com/in/amking23/">linkedin</a></h5>
            <h5 className="contact-info contact-divider">|</h5>
            <h5 className="blue contact-info"><a className="contact-link" target="_blank" href="https://github.com/amking23">github</a></h5>
          </div>
          <div className="contact-div">
            <h3 className="contact-name">MADELYN ROMZEK</h3>
            <h5 className="blue contact-info"><a className="contact-link" target="_blank" href="https://www.linkedin.com/in/mromzek/">linkedin</a></h5>
            <h5 className="contact-info contact-divider">|</h5>
            <h5 className="blue contact-info"><a className="contact-link" target="_blank" href="https://github.com/MadelynRomzek">github</a></h5>
            <h5 className="contact-info contact-divider">|</h5>
            <h5 className="blue contact-info"><a className="contact-link" href="mailto:mrromzek@umich.edu">email</a></h5>
          </div>
        </div>
    </div>
  )
}

export default Contact;