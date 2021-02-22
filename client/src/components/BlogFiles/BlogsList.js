
import React from 'react'

import { connect } from 'react-redux'

import Header from '../Header'
import Info from '../Info'

import { Link } from 'react-router-dom'

import { fetchBlogs  , fetchCurrentBlog , updatePage , blogCount } from '../../actions'

import '../../srcStyles.css'

class BlogsList extends React.Component {
    constructor(props){
      super(props)
    }


   componentDidMount() {
    this.props.fetchBlogs(this.props.page)
    this.props.fetchCurrentBlog()
    this.props.blogCount()
  }


  render() {

    const paginate= async (i)=>{
        await this.props.updatePage(this.props.page + i)
          this.props.fetchBlogs(this.props.page)
    }



    const renderContent = () => {
      return this.props.blogs.map((blog, index) => {
        return (
          <div key={index} className="container pt-3" style={{ maxWidth: '65em' , paddingLeft: '5%'  }} >
            <center>
                <div className="card mb-3" style={{border: 'none' , backgroundColor: 'rgba(245,245,245, 0.2)' }}>

                    <div className="row g-0">
                        <div className="col-md-6 "  style={{ display:'block', margin: 'auto' }} >
                          <span className="card-title "> <Link to={`/blogs/${blog.title}`} className="nav-link">  <img  className="card-img cardStyle"  src={blog.image} width="100%" height='auto' />   </Link> </span>
                        </div>

                        <div className="col-md-6">
                          <div className="card-block h-100 d-flex justify-content-center align-items-center" >
                              <div className="card-body " >
                                  <h5 className="card-title" > <Link to={`/blogs/${blog.title}`} className="nav-link blogStyle"><p>{blog.title.split('-').join(' ')}</p> </Link> </h5>
                                    <p className="card-text"><small className="text-muted" style={{fontSize: '12px'}}> {blog.created} </small></p>
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


    return (
      <div >
          <Header />

         <div style={{ marginLeft:"4%",  marginRight:"4%" , paddingTop: "1%"   }} >
               <div className="row">

                   <div className="col-lg-8">
                     <div style={{paddingBottom: '30px'}}>  {renderContent()} </div>

                              <div className="container" style={{textAlign: 'center'}}>
                                    <div className="row">
                                        <div className="col-6">

                                           <button disabled={this.props.page<3} className="btn btn-outline-dark notWorking" onClick={()=> paginate(-5)} style={{width: '75%'  }}>
                                              <i className="fas fa-arrow-left"> <span style={{fontFamily: 'Montserrat'}}> Back Page </span> </i>
                                            </button>


                                        </div>
                                        <div className="col-6">
                                           <button  disabled={(this.props.page+5) >= this.props.count} className="btn btn-outline-dark" onClick={()=> paginate(5)} style={{width: '75%'}}>
                                              <span style={{fontFamily: 'Montserrat'}}> Next Page   <i className="fas fa-arrow-right">  </i> </span>
                                             </button>
                                        </div>
                                    </div>
                              </div>

                   </div>

                   <div className="col-lg-4">
                     <div style={{paddingLeft: '5%' , paddingRight: '5%' }}> <Info/> </div>



                   </div>




               </div>
         </div>


      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return { blogs: state.blogs  , page: state.currentPage , count: state.blogCount}
}

export default connect(mapStateToProps, { fetchBlogs, fetchCurrentBlog , updatePage  , blogCount })(BlogsList)
