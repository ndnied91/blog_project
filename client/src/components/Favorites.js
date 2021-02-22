import React from 'react'
import { connect } from 'react-redux'
import { fetchFavorites } from '../actions'

import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom'

import Header from './Header'

class Favorites extends React.Component{

  componentDidMount() {
    this.props.fetchFavorites()
  }

  render(){

    const renderBlogs=()=>{
      return this.props.blogs.map( (blog)=>{
         return(
           <div>
            <h1> {blog.title.replaceAll('-', ' ')} </h1>

            <div className="style">
               <ReactQuill
                value={blog.body}
                modules = {{ toolbar: false }}
                readOnly={true} />
            </div>

           </div>
         )
      })
    }



    // const renderBlogs=()=>{
    //   return this.props.blogs.map( (blog)=>{
    //      return(
    //        <div>
    //         <h1> {blog.title.replaceAll('-', ' ')} </h1>
    //
    //         <div className="style">
    //            <ReactQuill
    //             value={blog.body}
    //             modules = {{ toolbar: false }}
    //             readOnly={true} />
    //         </div>
    //
    //        </div>
    //      )
    //   })
    // }
    //


    // const renderContent = () => {
    //   return this.props.blogs.map((blog, index) => {
    //     return (
    //       <div key={index} className="container pt-3" style={{ maxWidth: '65em' , paddingLeft: '5%'  }} >
    //
    //             <div className="card mb-3" style={{border: 'none' , backgroundColor: 'rgba(245,245,245, 0.2)' }}>
    //
    //                 <div className="row g-0">
    //                     <div className="col-md-6"  style={{ display:'block', margin: 'auto' }} >
    //                       <span className="card-title "> <Link to={`/blogs/${blog.title}`} className="nav-link">  <img  className="card-img cardStyle"  src={blog.image} width="100%" height='auto'  alt={blog.title}/>   </Link> </span>
    //                     </div>
    //
    //                     <div className="col-md-6">
    //                       <div className="card-block h-100 d-flex justify-content-center align-items-center" >
    //                           <div className="card-body " >
    //                               <h5 className="card-title" > <Link to={`/blogs/${blog.title}`} className="nav-link blogStyle"><p>{blog.title.split('-').join(' ')}</p> </Link> </h5>
    //                                 <p className="card-text"><small className="text-muted" style={{fontSize: '12px'}}> {blog.created} </small></p>
    //                                 <p className="card-text "> {blog.summary}</p>
    //                           </div>
    //                       </div>
    //                     </div>
    //                 </div>
    //             </div>
    //           <p className='borderStyle'/>
    //       </div>
    //     )
    //   })
    // }


    const renderContent = () => {
      return this.props.blogs.map((blog, index) => {
        return (
          <div key={index} >
                        <span className="card-title "> <Link to={`/blogs/${blog.title}`} className="nav-link">  <img  className="card-img cardStyle"  src={blog.image} width="100%" height='auto'  alt={blog.title}/>   </Link> </span>
                           <div className="card-body" >
                              <h5 className="card-title" > <Link to={`/blogs/${blog.title}`} className="nav-link blogStyle"><p>{blog.title.split('-').join(' ')}</p> </Link> </h5>
                                <p className="card-text"><small className="text-muted" style={{fontSize: '12px'}}> {blog.created} </small></p>
                                <p className="card-text "> {blog.summary}</p>
           </div>
              <p className='borderStyle'/>
          </div>
        )
      })
    }



    // <div class="row">
    //   <div class="col-sm-8">col-sm-8</div>
    //   <div class="col-sm-4">col-sm-4</div>
    // </div>









    return(
      <div >
      <Header/>



             <div className="title text-center"> Top Visited Blogs </div>

               <div className="container">
                    {renderContent()}
          </div>



       </div>
    )
  }
}



const mapStateToProps =(state)=>{
  return { blogs : state.favorites }
}

export default connect(mapStateToProps , {fetchFavorites})(Favorites)
