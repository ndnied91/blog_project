//THIS IS FOR WHEN USER IS CREATING THE BLOG

import React from 'react'
import ReactQuill from 'react-quill';

import {connect} from 'react-redux'
import {withRouter } from 'react-router-dom'


import { submitCommunityPost , previewBlog} from '../../actions/communityIndex.js'

import ConfirmAddModal from './ConfirmAddModal'

import CommunitySideCard from './CommunitySideCard'

class PreviewCommunityPage extends React.Component{
  constructor(props){
    super(props)

    this.state={ showModal: false }
  }

   componentDidMount(){
       // this._div.scrollTop = 0
        window.scrollTo(0, 0)
 }


  render(){



      const { blog } = this.props; //destructutred values


    const renderBlogContent =()=>{
      if (blog !== null) {

        return (
          <div className="container" ref="main">
            <div style={{ textAlign: 'left' }}>
                  <div className="blogTitle"> {blog.title}</div>
                  <div className="text-muted" style={{fontSize: '15px' }}> Example Date </div>
                  <div className="text-muted" style={{fontSize: '15px' }}> Author : {blog.author} </div>
                  <div className="text-muted" style={{fontSize: '15px' }}> instagram : {blog.instagram} </div>
            </div>

            <div className="style">
               <ReactQuill
                value={blog.communityBody}
                modules = {{ toolbar: false }}
                readOnly={true} />
            </div>


          </div>
        )
      }
      else return null
    }



const submitandClear=()=>{
    console.log('in preview')
    console.log(this.props.blog)
    this.props.submitCommunityPost(this.props.blog, this.props.history)
   let clearer = { title:'', author:'', communityBody: '', image: '', secret:'', state: '', tags: '', featured: false, instagram: ''}
   this.props.previewBlog(clearer)
}


const confirmModal=()=>{
  this.setState({ showModal: true})
}


    return(
      <div className="container" >
        <div class="container-lg" style={{height: 'auto'}}>
            <hr className='borderStyle' style={{marginTop: '25px'}}/>
            <div className="row">
              { /*    <div className="col-lg-8"> {renderBlogContent()}  </div>   */}
              <div className="col-lg-8"> {renderBlogContent()}  </div>
              <div className="col-lg-4 customCardStyle" style={{minWidth: '275px'}}> <CommunitySideCard preview={this.props.blog}/> </div>
            </div>
          </div>



        <div className="row" style={{paddingTop: '50px', paddingBottom: '50px'}}>
            <div className="col-12 col-md-8">
              <button className="btn btn-outline-secondary btn-lg btn-block" onClick={ confirmModal} > Submit </button>

              { /* this on submit should trigger and make a call to database to send out   */}
              <br/>
            </div>

            <div className="col-12 col-md-4" >
                <button class="btn btn-outline-danger btn-lg btn-block" type="submit" onClick={this.props.onReturn} > Go back </button>
                  {this.state.showModal === true ? <ConfirmAddModal
                        blog={this.props.blog}
                        history={this.props.history}
                        hideModal={ ()=> this.setState({showModal: false }) } /> : null }  { /*  /callback to hide modal */}

                { /* go back to edit blog   */}
            </div>
        </div>

    </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {  blog: state.previewComm }
}


export default connect( mapStateToProps , {submitCommunityPost  , previewBlog
}  )(withRouter(PreviewCommunityPage))
