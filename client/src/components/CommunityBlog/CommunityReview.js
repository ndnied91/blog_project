

//this is for review page on dash

import React from 'react'

import {connect} from 'react-redux'
import {Link } from 'react-router-dom'

import { fetchCurrentBlog } from '../../actions'
import {fetchBlogsForReview , fetchIndBlogForReview } from '../../actions/communityIndex.js'



class CommunityReview extends React.Component{

  async componentDidMount(){
      this.props.fetchCurrentBlog() // just makes it null so blogs dont overlap
      this.props.fetchBlogsForReview(null)
      await this.props.fetchIndBlogForReview(null)
  }




  render(){


    const capitalizeFirstLetter =(text)=> {
        text = text.replaceAll('-', ' ').toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
      return text
    }


    const renderContent=()=>{

      if(this.props.blogs.length > 0){
          return this.props.blogs.map( (blog)=>{
              return(
                <div className="container pt-3">
                  <span className="card-title "> <Link to={`/dashboard/review/${blog.title} `} blog={'blog'} className="nav-link">  {capitalizeFirstLetter(blog.title)}  </Link> </span>
                   <p className="nav-link"> {blog.created} </p>
               </div>
              )
          })
      }
        else
            return(
              <div style={{paddingTop: '50px'}}>
                <center><h2>No Blogs to Review </h2></center>
               </div>
            )
      }


    return(
      <div className="container">
        <center><h2 style={{paddingTop: '20px'}}> User Added Blogs to Review </h2></center>
        {renderContent()}
       </div>
    )
  }
}




const mapStateToProps = (state) =>{
  return {blogs: state.communityBlogReview}
}


export default connect(mapStateToProps,  {fetchBlogsForReview , fetchCurrentBlog, fetchIndBlogForReview})(CommunityReview)
