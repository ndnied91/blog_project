import React from 'react'

import { Link } from 'react-router-dom'

import '../srcStyles.css'

const Footer = () =>{

  return(
     <div className="container">
           <div className="footer">
                     <div style={{display: 'flex' ,  justifyContent: 'center' , fontSize: '15px'  }}>

                          <p style={{color: 'white' , fontWeight: '500' , paddingRight: '20px'}}> Copyright 2021 </p>

                          <span className="trail"> <Link to="/" > <p className="footerLinks"  > Home </p> </Link></span>
                          <span className="trail"> <Link to="/contact" > <p className="footerLinks" > | Contact </p> </Link></span>


                        <a style={{marginTop:'1px'}}  className="footerLinks" target="_blank" href='https://github.com/ndnied91'> | <i className="fab fa-github fa-lg"></i> </a>

                        <a style={{marginTop:'1px'}} className="footerLinks" target="_blank" href='https://www.instagram.com/danny_n00/'> | <i className="fab fa-instagram fa-lg"></i> </a>


                        <a style={{marginTop:'1px'}} className="footerLinks" target="_blank" href='https://www.linkedin.com/in/daniel-niedzwiedzki/'> | <i className="fab fa-linkedin fa-lg"></i> </a>



             </div>
           </div>




     </div>
   )
}

export default Footer
