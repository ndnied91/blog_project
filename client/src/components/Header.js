import React from 'react';
import { Link } from 'react-router-dom'

import {connect} from 'react-redux'

import {fetchUser} from '../actions'

import '../srcStyles.css'

class Header extends React.Component{

  constructor(){
    super()
      this.state = {notShow: true }
      this.handleNavCollapse = () => {
          if(this.state.notShow === true){ this.setState({notShow : false}) }
          else{ this.setState({notShow : true}) }
      }
  }


  componentDidMount(){
    document.addEventListener('mousedown' , this.handleClick, false)
    this.props.fetchUser()

  }

  componentWillUnmount(){
    document.removeEventListener('mousedown' , this.handleClick, false)
  }


  handleClick =(e)=>{
    if(this.node.contains(e.target)){
      return
      //the clicks is inside, continue to whatever you are doing
    }

    else{
        if(this.state.notShow === false){
          this.handleNavCollapse()
        }
    }
    //the click is outside, do something
  }


  render(){

    return(

     <div ref={(ref) => this._div = ref} > {/* this is for dropdown, DONT TOUCH  */}






     <div className="backgIMG">
                  <h1  style={{ textAlign:'center' , paddingTop : '40px'  , textDecoration: 'none'}} >
                    <Link to="/" className="title" > <span style={{fontSize: '65px' }}>  Traveling The World  </span> </Link>
                  </h1>
    </div>





          <div ref={node => this.node = node}> {/* this is for dropdown, DONT TOUCH  */}

                 <nav className="navbar navbar-expand-lg navbar-light bannerGround" >

                  <span>  <Link to="/" className="navbarLogo" > <span>  Logo can go here  </span> </Link>  </span>





                       <button className="navbar-toggler"  style={{float: 'right' }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                         <span onClick ={ ()=> this.handleNavCollapse() } className="navbar-toggler-icon"></span>
                       </button>



                       <div className={`${this.state.notShow ? 'collapse ' : null} navbar-collapse `} >

                      <div style= {{width: '100%' , height: '40px' }}>



                        <ul className="navbar-nav mt-0 mt-lg-0 collapseStyling" >




                        <li className="nav-item">
                        <div style={{fontSize: '30px', paddingRight: '50px' , fontWeight: '500' , color: 'red'}}> {this.props.currentUser !== null ? <p> {this.props.currentUser} </p> : null } </div>
                        </li>


                      <li className="nav-item">
                        <Link to="/about" className="nav-link"> <p className="headerLinks">About </p> </Link>
                      </li>

                          <li className="nav-item">
                                 <Link to="/favorites" className="nav-link"> <p className="headerLinks" >Favorites </p> </Link>
                          </li>

                          <li className="nav-item">
                                  <Link to="/community" className="nav-link"> <p className="headerLinks"> Community </p> </Link>
                          </li>

                          <li className="nav-item">
                                  <Link to="/destinations" className="nav-link"> <p className="headerLinks"> Destinations </p> </Link>
                          </li>


                          <li className="nav-item">

                                 { (this.props.permaCookie !== null ||  this.props.auth !==null) ? <Link to="/dashboard" className="nav-link"> <p className="headerLinks" > Dashboard </p> </Link> : null }
                          </li>
                        </ul>



                       </div>
                     </div>
                   </nav>

             </div>



      </div>


    )
  }
}


const mapStateToProps=(state)=>{
  return {permaCookie: state.permaCookie, auth: state.auth , currentUser: state.username}
}



export default connect(mapStateToProps , {fetchUser})(Header)
