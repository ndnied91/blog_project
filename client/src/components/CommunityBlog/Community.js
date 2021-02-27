//main community page

import React from 'react'
import Header from './../Header'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

import CommModal from './CommModal.js'

import { fetchApprovedCommBlogs, fetchApprovedCommBlog } from '../../actions/communityIndex'


import { getTags} from '../../actions/'

import CommunityForm from './CommunityForm'

import PreviewCommunityPage from './PreviewCommunityPage'

class Community extends React.Component{
constructor(props){
  super(props)

  this.state= ({ showForm: false, showModal : false, columns: []  , showPre: false  })

}


componentDidMount(){
  this.props.fetchApprovedCommBlogs() //GETS THE WHOLE LIST OF COMMUNITY BLOGS
  this.props.fetchApprovedCommBlog(null)
  this.props.getTags()
}


  showForm(e){
  this._div.scrollTop = 0
    if(this.state.showForm ===false){
      this.setState({ showForm: true , showModal: true , showPre: false})


    }
    else{
      this.setState({ showForm: false})
    }

  }



showPreview(){
  this.setState({showForm: false , showPre: true})
}



// onReturn(){
//    this.setState({ showForm: true ,showPre: false})
// }




  render(){


      const renderContent = () => {
          if(this.props.blogs !== null){
              return this.props.blogs.map((blog, index) => {
                    return (
                      <div key={index} className="container pt-3" style={{ paddingLeft: '5%'  }} >
                        <center>
                            <div className="card mb-3" style={{border: 'none' , backgroundColor: 'rgba(245,245,245, 0.2)' }}>

                                <div className="row g-0">
                                    <div className="col-md-6 "  style={{ display:'block', margin: 'auto' }} >
                                      <span className="card-title "> <Link to={`/community/${blog.title}`} className="nav-link">  <img  className="card-img cardStyle"  src={blog.image} width="100%" height='auto' />   </Link> </span>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="card-block h-100 d-flex justify-content-center align-items-center" >
                                          <div className="card-body " >
                                                <h5 className="card-title" > <Link to={`/community/${blog.title}`} className="nav-link blogStyle"><p>{blog.title.split('-').join(' ')}</p> </Link> </h5>
                                                <p className="card-text"><small className="text-muted" style={{fontSize: '12px'}}> {blog.created} </small></p>
                                                <p className="card-text"><small className="text-muted" style={{fontSize: '12px'}}> Written by : {blog.author} </small></p>
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

<div ref={(ref) => this._div = ref}>
  <Header/>
      <div >

      <div>
          <button className="btn btn-dark" onClick={(e)=>this.showForm(e)}> Blog <i className="fas fa-plus"></i> </button>
          {this.state.showForm ? <CommunityForm onCancel={ ()=> this.setState({showForm: false})} showPreview={ ()=>  this.setState({showForm: false , showPre: true})  }  edit={ ()=> this.setState({ showForm: true ,showPre: false}) } /> : null }

            { this.state.showPre === true ? <PreviewCommunityPage  onReturn={ ()=> {this.setState({ showForm: true ,showPre: false})}  } /> : null}


      </div>




      { /* <div className="" style={{display: 'grid', gridAutoFlow: 'column' , paddingLeft: '30px' , paddingRight: '30px'}}> */}
      <div className="container">
       { this.state.showModal === true ? <CommModal /> : null}
      { renderContent()}



       </div>




      </div>
  </div>
    )
  }
}


const mapStateToProps = (state) => {
  return { blogs: state.communityBlogsApproved , preview : state.previewComm}
}

export default connect( mapStateToProps , {fetchApprovedCommBlogs , fetchApprovedCommBlog , getTags} )(Community)
