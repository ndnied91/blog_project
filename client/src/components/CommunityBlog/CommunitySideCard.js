
import React from 'react'
import { connect } from 'react-redux'
import { Link , withRouter } from 'react-router-dom'


import { fetchCurrentBlog , fetchIndividualBlog } from '../../actions'

class SideCard extends React.Component{


renderImage(){
  if(this.props.currentBlog !== null){
    return this.props.currentBlog.image
  }
  return null
}



renderPreview(){
  if(this.props.preview ){
    return this.props.preview.image
  }
  return null
}






renderContent(){
  if(this.props.relatedBlogs && this.props.currentBlog){
    return this.props.relatedBlogs.map((blog)=>{
      if(blog.title !== this.props.currentBlog.title){
        return(
          <div>
              <ul className="list-group list-group-flush">
                    <Link className="card-link" to={`/blogs/${blog.title }`}> <p  onClick ={ () => this.props.fetchIndividualBlog(blog.title)} >{blog.title.replace(/-/g, ' ')} </p> </Link>
              </ul>
          </div>
        )
      }

    })

  }
  return null
}






  render(){

    // console.log(this.props)


if(this.props.relatedBlogs){
  this.props.relatedBlogs.forEach((item, i) => {
      // console.log(item)
  });

}




    return(
      <div className="card " >
        <img src={ this.props.preview ? this.renderPreview() :  this.renderImage()}   className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title"> Check out some similar blogs </h5>

              {this.renderContent()}




          </div>

          <div className="card-body text-center">
            <a href="/favorites" className="card-link"> Our Favorites </a>
            <a href="/community" className="card-link"> Community</a>
        </div>
    </div>

    )
  }
}




const mapStateToProps = (state)=>{
  return { currentBlog: state.currentCommunitytBlog  , relatedBlogs : state.relatedBlogs}
}


export default connect(mapStateToProps , {fetchCurrentBlog, fetchIndividualBlog})(withRouter(SideCard))
