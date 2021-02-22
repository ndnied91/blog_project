

import React from 'react'
import _ from 'lodash'


import {reduxForm, Field} from 'redux-form'


import {connect} from 'react-redux'

import { onSurveySubmit  , submitEditPost} from '../../actions'

//alows to connect to redux store
//basically the same as the connect helper

import { Link } from 'react-router-dom'

import BlogField from './BlogField'


class EditBlog extends React.Component{


renderField(){
   return (
     <div>
            <input label='Blog Title' name='title'  defaultValue= {this.props.blog.title} style={{marginBottom: '5px'}}/>
            <input label='Body' name='body' defaultValue= {this.props.blog.body}  style={{marginBottom: '5px'}}/>
    </div>
   )

}

  render(){
    return(
      <div>
        Blog Form
          <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)} >
            {this.renderField()}
            <button  type="submit"> Submit </button>
        </form>


      </div>
    )
  }
}







export default connect(
  mapStateToProps
)(reduxForm({
   form: 'simple', // a unique identifier for this form
  enableReinitialize: true
})(EditBlog))
