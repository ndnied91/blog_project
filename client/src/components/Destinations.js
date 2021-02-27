import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchAllBlogs, fetchBlogsByState } from '../actions'

import _ from 'lodash'

import Header from './Header'

class Destinations extends React.Component{


 componentDidMount(){
   this.props.fetchAllBlogs()
     this.props.fetchBlogsByState(null)
}




  render(){

    const capitalizeFirstLetter =(text)=> {
        text = text.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
      return text
    }




    const fixState =(state)=>{
       state.replace().replace("-" , " ")

       return capitalizeFirstLetter( state.replace().replace("-" , " ") )
    }




const renderLocations = ()=>{
  if(this.props.blogs){
        let unState=  _.uniq(_.map(this.props.blogs, 'state').sort())

        return unState.map((state)=>{
          return(
              <Link className="btnStyle" to= {`/destinations/${state.toLowerCase()}`}>   <div> {fixState(state)} </div>  </Link>
          )
        })

  }
}





    return(
      <div>
      <Header/>

          <div className="container">
          <div className="title text-center"> Destinations </div>
          <p> Check out our blogs by State </p>

            {renderLocations()}

          </div>

       </div>
    )
  }
}


const mapStateToProps = (state) => {
  // console.log(state)
  return { blogs: state.allBlogs }
}

export default connect( mapStateToProps, {fetchAllBlogs , fetchBlogsByState} )(Destinations)
