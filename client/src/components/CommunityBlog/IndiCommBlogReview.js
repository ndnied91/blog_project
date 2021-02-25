//shows users their forms inputs for review
import React from 'react'

import ReactQuill from 'react-quill'; // ES6 //ADDDDDDEDDD THIS
import {withRouter} from 'react-router-dom'

import { Field} from 'redux-form'
import {connect} from 'react-redux'
import _ from 'lodash'

import {fetchIndBlogForReview , submitReviewedCommunityPost , deleteFromPending } from '../../actions/communityIndex.js'
import SideCard from '../SideCard'


class IndiCommBlogReview extends React.Component{

async componentDidMount(){
  await this.props.fetchIndBlogForReview(this.props.match.params.title)
}



  render(){


  const submitApprovedCommunityPost= ()=>{
    //send over to community blogs
      console.log(this.props.reviewBlog)
      this.props.deleteFromPending(this.props.reviewBlog, this.props.history)
      this.props.submitReviewedCommunityPost(this.props.reviewBlog, this.props.history)
    }


    const deletePendingBlog= ()=>{
        this.props.deleteFromPending(this.props.reviewBlog , this.props.history)
      }



    const capitalizeFirstLetter =(text)=> {
        text = text.replaceAll('-', ' ').toLowerCase().split(' ') .map((s) => s.charAt(0).toUpperCase() + s.substring(1)) .join(' ');
      return text
    }



  const renderContent=()=>{
          if(this.props.reviewBlog !== null){
              return(
                    <div className="container">

                      <div style={{ textAlign: 'left' }}>
                            <div className="blogTitle"> {capitalizeFirstLetter(this.props.reviewBlog.title)}</div>

                            <div className="text-muted" style={{fontSize: '15px' }}> {this.props.reviewBlog.created}</div>
                            <div className="text-muted" style={{fontSize: '15px' }}> Blog by: {this.props.reviewBlog.author} </div>


                            <div className="style">
                               <ReactQuill
                                value={this.props.reviewBlog.communityBody}
                                modules = {{ toolbar: false }}
                                readOnly={true} />
                            </div>

                      </div>

                    </div>
                  )
        }
        else{
          return null
        }

    }


const blogReview = () =>{

  return(
    <div class="row">
        <div class="col-12 col-md-6"   >
          <button class="btnStyle btn btn-outline-secondary btn-lg btn-block" onClick={()=> submitApprovedCommunityPost()}> Approve Blog </button>
          {/*add blog to live community page*/}
            <br/>
        </div>
        <div class="col-12 col-md-6">
          <button class="btn btn-outline-danger btn-lg btn-block" type="submit" onClick={()=>deletePendingBlog()}> Decline Blog </button>
          {/*delete the blog from the hold tank*/}
        </div>

    </div>
  )
}


      return(
        <div ref="main">
            <div class="container-lg"  >

                <hr className='borderStyle' style={{marginTop: '25px'}}/>
                {blogReview()}
                <div className="row">
                  <div className="col-lg-8">  {renderContent()}  </div>
                  <div className="col-lg-4 customCardStyle" style={{minWidth: '275px'}}> <SideCard reviewImg={this.props.reviewBlog} /> </div>
                </div>
          </div>
         </div>
      )
    }
}


const mapStateToProps=(state)=>{
  return { reviewBlog: state.currentCommunitytBlog }
}


export default connect( mapStateToProps ,  {fetchIndBlogForReview , submitReviewedCommunityPost , deleteFromPending })(withRouter(IndiCommBlogReview))
