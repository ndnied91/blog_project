

import React from 'react'

import {connect} from 'react-redux'

import { submitCommunityPost , previewBlog} from '../../actions/communityIndex.js'

import { Button , Modal} from 'react-bootstrap';


class ConfirmAddModal extends React.Component{

  render(){


        const submitandClear=(blog, history)=>{
           this.props.submitCommunityPost(this.props.blog, this.props.history)

           let clearer = { title:'', author:'', communityBody: '', image: '', secret:'', state: '', tags: '', featured: false}
           this.props.previewBlog(clearer)
        }


    return(
      <div>

            <Modal
              show={true}
              onHide={this.props.hideModal}
              backdrop="static"
              keyboard={false}
              style={{top: '30%'}}
            >
              <Modal.Header>
                <Modal.Title>Submit Blog</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <center>
                <h4>Are you sure you want to submit this blog? </h4>
              </center>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={()=>submitandClear(this.props.blog , this.props.history)}>Submit</Button>
                <Button variant="primary" onClick={this.props.hideModal}>Cancel</Button>
              </Modal.Footer>
            </Modal>
      </div>
    );
  }
}




export default connect(null , {submitCommunityPost , previewBlog})(ConfirmAddModal)
