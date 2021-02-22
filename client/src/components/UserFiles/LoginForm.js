import React from 'react'

import { Field, reduxForm } from 'redux-form'
import {withRouter} from 'react-router-dom'

class LoginForm extends React.Component{

  renderUsername = ({input , label, meta}) => {
      return(
          <div>
            <input {...input} type="text" placeholder="username" autoComplete = 'off'/>
          </div>

      )
  }


  renderPassword = ({input , label, meta}) => {
      return(
          <div>
            <input {...input} type="password" placeholder="password" autoComplete = 'off'/>
          </div>
      )
  }


  onSubmit =(formValues)=>{
    // console.log(formValues)
    this.props.onSubmit(formValues )
  }





  render(){

    return(
      <div>

      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error" >
         <Field name="username" component={this.renderUsername} label="Username"/ >
         <Field name="password" component={this.renderPassword} label="Password" />
         <br/>
         <button className="ui button primary"> Submit </button>
       </form>


       </div>
    )
  }
}







export default reduxForm({
  form: 'loginForm',
})(withRouter(LoginForm))
