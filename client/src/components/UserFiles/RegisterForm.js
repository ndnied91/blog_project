import React from 'react'
import { Field, reduxForm } from 'redux-form'

import {withRouter} from 'react-router-dom'

class RegisterForm extends React.Component{



renderInput = ({input , label, meta}) =>{

    return(
        <div>
          <input {...input}  placeholder={label} autoComplete = 'off'/>
        </div>


          ///same way but with a shortcut, this passes all values as props
          // onChange = {formProps.input.onChange}
          // value = {formProps.input.value}
    )
}


onSubmit =(formValues)=>{
  this.props.onSubmit(formValues )
}


    render(){
      return(
         <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error" >
            <Field name="username" component={this.renderInput} label="Username"/ >
            <Field name="password" component={this.renderInput} label="Password" />
            <br/>
            <button className="ui button primary"> Submit </button>
          </form>
      )
    }
}


export default reduxForm({
  form: 'registerForm',
})(withRouter(RegisterForm))
