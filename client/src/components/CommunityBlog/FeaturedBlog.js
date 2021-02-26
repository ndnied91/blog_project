import React from 'react'

import {connect} from 'react-redux'


import {withRouter } from 'react-router-dom'


import { addFeatured  } from '../../actions/communityIndex'

class FeaturedBlog extends React.Component{

  render(){
    console.log(this.props)
      const {blog} = this.props


const submitPost =(blog)=>{
  console.log(blog)
    this.props.addFeatured(blog, this.props.history)
}



    return(
          <div>

            {blog.title}
            {blog.created}
            {blog.author}

            <button  onClick={()=>submitPost(blog)} > Add to Blogs </button>
            <button onClick={this.props.onCancel}> Cancel </button>
          </div>
    )
  }
}


export default connect( null , {addFeatured} )(withRouter(FeaturedBlog))
