

import React from 'react'
import {connect} from 'react-redux'
import Header from '../Header'
import { setPermaCookie , fetchIndividualBlog , getSimliarBlogs} from '../../actions'

import {reduxForm} from 'redux-form'
import ReactQuill from 'react-quill';


import keys from '../config/keys'

import '../../srcStyles.css'

import EditBlog from './EditBlog'
import SideCard from '../SideCard'
import BlogMap from '../BlogMap/BlogMap'

import ConfirmModal from './ConfirmModal.js'


class IndividualBlog extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        showComponent: false, showModal: false
      };
      this._onButtonClick = this._onButtonClick.bind(this);
      this._onCancelClick = this._onCancelClick.bind(this);
      this._hideForm = this._hideForm.bind(this);
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


    _hideForm(){
       this.setState({
         showComponent: false
       });
     }


   componentDidMount() {
    window.scrollTo(0, 0)
    this.props.setPermaCookie()
    this.props.fetchIndividualBlog(this.props.match.params.title)
    this.props.getSimliarBlogs(this.props.match.params.title)

  }




deleteConfirm(){
  this.setState({ showModal: true})
}


editPost(blog_id, history){
  return (
    <div className="container"  style={{textAlign: 'right' }}>
        <button  className="buttons" style={{ outline: 'white'}} onClick={this._onButtonClick} blog={this.props.blog}> <i className="fa fa-edit alt fa-2x fa-border buttons" ></i> </button>
        <button onClick={()=> this.deleteConfirm()  } className="right buttons" >   <i className="fa fa-trash alt fa-2x fa-border buttons"  aria-hidden="true" ></i>    </button>

         { this.state.showModal === true ?  <ConfirmModal blog={this.props.currentBlog._id } history= {this.props.history} hideModal={ ()=> this.setState({showModal: false}) }/> : null}
    </div>
  )
}


renderEditDeleteBtn(){

  if( this.props.user ){
    return(
      <div>
        {this.editPost(this.props.currentBlog._id , this.props.history) }
        </div>
    )
  }
  return null
}




renderAuthor(){
  return(
    <div>
        <div className="text-muted" style={{fontSize: '15px' }}> Created by: {this.props.currentBlog.author}</div>
          <div>

              <a href={`https://www.instagram.com/${this.props.currentBlog.instagram}`} target="_blank">   <i class="fab fa-2x fa-instagram"></i>  </a>

  </div>
      </div>
  )
}

  renderBlogContent() {
    if (this.props.currentBlog) {
        // console.log(this.props.currentBlog)

      return (

        <div className="container" ref="main">

          {this.renderEditDeleteBtn()}
          <div style={{ textAlign: 'left' }}>
                <div className="blogTitle"> {this.props.currentBlog.title.split('-').join(' ')}</div>
                <div className="text-muted" style={{fontSize: '15px' }}> {this.props.currentBlog.created}</div>

                { this.props.currentBlog.author ? this.renderAuthor() : null }
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
      // console.log(keys.test)
    // console.log(this.props.currentBlog)

    return (
      <div ref="main">
        <Header/>
        <div className="container-lg">
            <hr className='borderStyle' style={{marginTop: '25px'}}/>
            <div className="row">
              <div className="col-lg-8">  {this.state.showComponent ?  <EditBlog blog={this.props.blog} onCancel={this._onCancelClick} hideForm={this._hideForm} />  : <div>{ this.renderBlogContent()} </div>  }  </div>
              <div className="col-lg-4 customCardStyle" style={{minWidth: '275px'}}> <SideCard/> </div>


              <div className="col-lg-4 customCardStyle" style={{paddingTop: '30px' , border: 'none'}}>


                { this.props.currentBlog ? <BlogMap/> : null }

              </div>
            </div>
          </div>
       </div>
    )
  }
}





const mapStateToProps = (state, props) => {
  // console.log(state.currentBlog)
  return { user : state.permaCookie, currentBlog: state.currentBlog}
}



// export default connect( mapStateToProps,{  setPermaCookie , fetchIndividualBlog , getSimliarBlogs} )(IndividualBlog)



IndividualBlog = connect( mapStateToProps,{  setPermaCookie , fetchIndividualBlog , getSimliarBlogs} )(IndividualBlog)

export default reduxForm({
   form: 'blogEditForm'
})(IndividualBlog)
