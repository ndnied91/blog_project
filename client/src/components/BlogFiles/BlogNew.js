//THIS SHOWS SurveyForm AND SurveyFormReview

import React from 'react'

import {reduxForm} from 'redux-form'

import BlogForm from './BlogForm'
import BlogReview from './BlogReview'

class BlogNew extends React.Component{

  state = { showFormReview : false }


  renderContent(){
    if(this.state.showFormReview){
      return <BlogReview onCancel={()=> this.setState({showFormReview: false})}/>
    }
    return <BlogForm onBlogSubmit={ ()=> this.setState({showFormReview: true}) }/>
  }


  render(){
    return(

      <div>
        {this.renderContent()}
      </div>
    )
  }
}



export default reduxForm({
  form: 'surveyForm'
})(BlogNew)
