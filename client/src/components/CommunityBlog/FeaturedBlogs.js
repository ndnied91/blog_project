import React from 'react'
import {Link,Route, NavLink } from 'react-router-dom'

import {connect} from 'react-redux'

import { fetchFeaturedBlogs  } from '../../actions/communityIndex'

import FeaturedBlog from './FeaturedBlog'

class FeaturedBlogs extends React.Component{
  constructor(props){
    super(props)

    this.state = ({ showFeatured: false , blog: null})
  }


componentDidMount(){
  this.props.fetchFeaturedBlogs()
}


  render(){

/* Things were going to need

  action to save blog
  save blog with new date

  <span className="card-title "> <Link to={`/dashboard/featured/${blog.title} `} blog={'blog'} className="nav-link">  {capitalizeFirstLetter(blog.title)}  </Link> </span>
  feature on main page

  */

  const showComponent=(blog)=>{
    this.setState({showFeatured: true  , blog: blog})
  }


  const capitalizeFirstLetter =(text)=> {
      text = text.replaceAll('-', ' ').toLowerCase().split(' ') .map((s) => s.charAt(0).toUpperCase() + s.substring(1)) .join(' ');
    return text
  }


  const renderContent=()=>{
    if(this.props.featured.length > 0){
      return this.props.featured.map( (blog)=>{
        return(
          <div className="">

          <div className="container pt-3">

           <div onClick={ ()=> showComponent(blog) }> {capitalizeFirstLetter(blog.title)} </div>
             <p className="nav-link"> {blog.created} </p>
         </div>
           </div>
        )
      })
    }

  }



    return(
      <div>

      <center>
      Featured Blogs

        {this.state.showFeatured ===true ? <FeaturedBlog blog={this.state.blog}  onCancel={ ()=> this.setState({showFeatured: false}) } />   : renderContent()}

      </center>



      </div>
    )
  }
}


const mapStateToProps = (state) =>{
  return {featured: state.featuredBlogs }
}

export default connect(mapStateToProps , {fetchFeaturedBlogs})(FeaturedBlogs)
