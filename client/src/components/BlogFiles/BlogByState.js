import React from 'react'

import {connect} from 'react-redux'
import { fetchBlogsByState , fetchCurrentBlog} from '../../actions'

import { Link } from 'react-router-dom'

import Header from '../Header'

class BlogByState extends React.Component{

componentDidMount(){
  this.props.fetchBlogsByState(this.props.match.params.state)
  this.props.fetchCurrentBlog()
}

  render(){

const renderContent = ()=>{
  console.log(this.props)

        if(this.props.blogs){
          return this.props.blogs.map((blog , index)=>{
            return (
              <div key={index} className="container pt-3" style={{ maxWidth: '65em' }} >
                <center>
                    <div className="card mb-3" style={{border: 'none'}}>

                        <div className="row g-0" >
                            <div className="col-md-6"  style={{ display:'block', margin: 'auto' }} >
                              <span className="card-title "> <Link to={`/blogs/${blog.title}`} className="nav-link">  <img  className="card-img cardStyle"  src={blog.image} width="100%" height='auto' />   </Link> </span>
                            </div>

                            <div className="col-md-6">
                              <div className="card-block customSizing h-100 d-flex justify-content-center align-items-center" >
                                  <div className="card-body " >
                                      <h5 className="card-title" > <Link to={`/blogs/${blog.title}`} className="nav-link blogStyle"><p>{blog.title.split('-').join(' ')}</p> </Link> </h5>
                                        <p className="card-text"><small className="text-muted"> {blog.created} </small></p>
                                        <p className="card-text "> {blog.summary}</p>
                                  </div>
                              </div>
                            </div>
                        </div>
                    </div>

                </center>
                  <p className='borderStyle'/>
              </div>
            )
          })
        }

}


    return(
      <div>
      <Header/>
        <div className="container">
        {renderContent()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  console.log(state.byStateBlogs)
  return { blogs: state.byStateBlogs}
}


export default connect(mapStateToProps , {fetchBlogsByState , fetchCurrentBlog})(BlogByState)
