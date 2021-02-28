

import React from 'react'

import {connect} from 'react-redux'

import { deleteBlog } from '../../actions'



import { adminDeleteCommunity } from '../../actions/communityIndex'

import { Button , Modal} from 'react-bootstrap';


class ConfirmModal extends React.Component{

  render(){
        const deleteBlog =(blog_id , history )=>{
            if(this.props.location){
              console.log('deleteing community blog')
              this.props.adminDeleteCommunity(blog_id, this.props.user, history )
              // this.props.adminDeleteCommunity(blog_id, '2349237984' , history )
            }
            else{
              this.props.deleteBlog(blog_id, history) //main blog delete
            }

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
                <Modal.Title>Blog Guidelines</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <center>
                <h4>Are you sure you want to delete this blog? </h4>
              </center>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={()=>deleteBlog(this.props.blog , this.props.history)}>Delete</Button>
                <Button variant="primary" onClick={this.props.hideModal}>Cance</Button>
              </Modal.Footer>
            </Modal>
      </div>
    );
  }
}




export default connect(null , {deleteBlog , adminDeleteCommunity})(ConfirmModal)
