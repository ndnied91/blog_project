//INDIVIDUAL BLOG ON THE COMMUNITY PAGE

import React from 'react'
import {connect} from 'react-redux'
import Header from '../Header'
import {  deleteBlog  , fetchIndividualBlog , getSimliarBlogs} from '../../actions'

import {reduxForm} from 'redux-form'
import ReactQuill from 'react-quill';

import ConfirmModal from '../BlogFiles/ConfirmModal.js'

import {fetchApprovedCommBlog} from '../../actions/communityIndex.js'

import '../../srcStyles.css'

import CommunitySideCard from './CommunitySideCard'


import ConfirmCommunityModal from './ConfirmCommunityModal'

class IndividualBlog extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        showComponent: false, showModal: false , showAdminDeleteModal: false
      };
      this._onButtonClick = this._onButtonClick.bind(this);
      this._onCancelClick = this._onCancelClick.bind(this);
    }


  _onButtonClick() {
     this.setState({
       showComponent: true
     });
   }


   _onCancelClick(){
      this.setState({
        showComponent: false
      });
    }


  componentDidMount() {
    this.refs.main.scrollTop=0
    this.props.fetchApprovedCommBlog(this.props.match.params.title)

  }


  deleteConfirm(){
    this.setState({ showAdminDeleteModal: true})
  }






capitalizeFirstLetter(text){
    text = text.replaceAll('-', ' ').toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
  return text
}






renderDeleteBtn(){

  if( this.props.user ){
    return(
      <div>
          <button onClick={()=> this.deleteConfirm()  } className="right buttons" >   <i style={{ color: 'red' }}className="fa fa-trash alt fa-2x fa-border buttons"  aria-hidden="true" ></i>    </button>
          { this.state.showAdminDeleteModal === true ?  <ConfirmModal blog={this.props.currentBlog._id } location={'community'} history= {this.props.history}  user={this.props.user} hideModal={ ()=> this.setState({showAdminDeleteModal: false}) }/> : null}
        </div>
    )
  }
  return null
}



  renderBlogContent() {

    if (this.props.currentBlog) {
        console.log('in community INDIVIDUAL blog')
      // console.log(this.props.currentBlog)
      return (
        <div className="container" ref="main">


          <div style={{ textAlign: 'left' }}>

                <div style={{display: "flex" , justifyContent: "space-between" }}>

                  <div  className="blogTitle">{this.capitalizeFirstLetter(this.props.currentBlog.title)} </div>

                  <button onClick={()=> this.setState({showModal: true }) } className="right buttons"> <i className="fa fa-trash alt fa-2x fa-border buttons"  aria-hidden="true" ></i>  </button>
                  { this.state.showModal === true ?  <ConfirmCommunityModal blog={this.props.currentBlog } history= {this.props.history} hideModal={ ()=> this.setState({showModal: false}) }/> : null}
                  </div>




                <div className="text-muted" style={{fontSize: '15px' }}> {this.props.currentBlog.created}</div>
                <div className="text-muted" style={{fontSize: '15px' }}> {this.props.currentBlog.instagram}</div>

              <div className="style">
                 <ReactQuill
                  value={this.props.currentBlog.body}
                  modules = {{ toolbar: false }}
                  readOnly={true} />
              </div>
          </div>

        </div>
      )
    }


  }

  render() {


    // console.log(this.props.currentBlog)

    return (
      <div ref="main">
        <Header/>
        <div class="container-lg">
            <hr className='borderStyle' style={{marginTop: '25px'}}/>
              {this.renderDeleteBtn()}
            <div className="row">
              <div className="col-lg-8">  {this.renderBlogContent()}  </div>
              <div className="col-lg-4 customCardStyle" style={{minWidth: '275px'}}> <CommunitySideCard/> </div>
            </div>
          </div>
       </div>
    )
  }
}




const mapStateToProps = (state, props) => {
  // console.log(state)
  return { user : state.auth , currentBlog: state.currentCommunitytBlog}
}



IndividualBlog = connect( mapStateToProps,{ deleteBlog  , fetchIndividualBlog , getSimliarBlogs, fetchApprovedCommBlog} )(IndividualBlog)

export default reduxForm({
   form: 'blogEditForm'
})(IndividualBlog)
