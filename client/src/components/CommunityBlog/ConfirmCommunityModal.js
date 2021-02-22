
import React from 'react'

import {connect} from 'react-redux'

import { deleteCommunityBlog } from '../../actions/communityIndex'

import { Button , Modal} from 'react-bootstrap';


class ConfirmCommunityModal extends React.Component{
  constructor(props){
    super(props)
    this.state={ key: '' }

    this.onInputchange = this.onInputchange.bind(this);
  }


  onInputchange(event) {
     this.setState({
       [event.target.name]: event.target.value
     });
   }


  render(){

    // console.log(this.props.blog._id)

        const deleteBlog =(blog_id , title , key , history )=>{
          console.log(blog_id)

          let values = { blog_id , title, key }
          console.log(values)
          this.props.hideModal()
          this.props.deleteCommunityBlog(values, history)

          //pass all of this to an action which will delete the blog from the database if password is correct

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

                <label> Please enter your key for this blog :  </label>

                 <input name="key" type="text"  value= {this.state.key} onChange={this.onInputchange} />


              </center>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={()=>deleteBlog(this.props.blog._id , this.props.blog.title,  this.state.key, this.props.history)}>Delete</Button>
                <Button variant="primary" onClick={this.props.hideModal}>Cancel</Button>
              </Modal.Footer>
            </Modal>
      </div>
    );
  }
}




export default connect(null , {deleteCommunityBlog})(ConfirmCommunityModal)
