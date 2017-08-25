import React from 'react';


const Footer = (props) => {

  const navToContactPage = () => {
    props.history.push('/contact');
  }

  return (
    <div className="display-bottom" onClick={navToContactPage}>
      <button type="button" className="footerBtn grey">MEET THE DEVELOPERS</button>
    </div>
  )
}

export default Footer;