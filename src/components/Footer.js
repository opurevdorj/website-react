import React from 'react'
import "./Footer.css"
import Logo from '../icons/Logo'
import Next from '../icons/NextButton'
import Instagram from '../icons/Instagram'
import Facebook from '../icons/Facebook'
import Twitter from '../icons/Twitter'

function Footer() {
  return (
    <div className='footerContainer'>
    <div className='footerSubContainer'>
    <div className='menuContainer'>
    <span className='menuTitles'><Logo/></span>
    <span> <Instagram/> Instagram</span>
    <span> <Facebook/> Facebook</span>
    <span> <Twitter/> Twitter</span>
    
    </div>
    <div className='menuContainer'>
    <span className='menuTitles'>Use Cases</span>
    <span>UI Design</span>
    <span>UX Design</span>
    <span>Phototyping</span>
    
    </div>
    <div className='menuContainer'>
    <span className='menuTitles'>Explore</span>
    <span>Figma</span>
    <span>Customers</span>
    <span>Why I Love Figma</span>
    
    </div>
    <div className='menuContainer'>
    <span className='menuTitles'>Resources</span>
    <span>Community Resources Hub</span>
    <span>Support</span>
    <span>Education</span>
    </div>
  <div className='menuContainer'>
  <span className='menuTitles'>Subscribe to our newsletter</span>
  <span>
  <input placeholder='Email' style={{width: "130px", height: "25px"}}/>
  <button><Next/></button>
  </span>

  </div>
    </div>
    </div>
  )
}

export default Footer