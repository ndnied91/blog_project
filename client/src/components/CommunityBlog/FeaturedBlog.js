import React from 'react'

import {connect} from 'react-redux'


import {withRouter } from 'react-router-dom'


import { addFeatured  , deleteFromFeatured } from '../../actions/communityIndex'

class FeaturedBlog extends React.Component{

  render(){

      const {blog} = this.props


const submitPost = async(blog)=>{
    await this.props.addFeatured(blog, this.props.history)
    await this.props.deleteFromFeatured(this.props.blog._id , this.props.history)
    this.props.onCancel()
}



    return(
          <div>

            {blog.title}
            {blog.created}
            {blog.author}
            {blog.instagram}

            <button  onClick={()=>submitPost(blog)} > Add to Blogs </button>
            <button onClick={this.props.onCancel}> Cancel </button>
          </div>
    )
  }
}


export default connect( null , {addFeatured , deleteFromFeatured} )(withRouter(FeaturedBlog))
