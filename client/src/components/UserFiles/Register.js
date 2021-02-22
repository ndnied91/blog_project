import React from 'react'

 import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'


import {addUser} from '../../actions'

import Header from '../Header'
import RegisterForm from './RegisterForm'

class Register extends React.Component{

  onSubmit =(formValues)=>{
    this.props.addUser(formValues, this.props.history)
  }



  render(){

    return(
      <div>
      <Header/>

      <div class="text-center" style={{marginLeft: '20%' , marginRight: '20%', width: '60%'}}>
      <br/>
            <p style={{fontSize: '25px'}}> Please create a user here </p>
                    <RegisterForm onSubmit={this.onSubmit} />
               </div>

      </div>



    )
  }
}




export default connect(null , { addUser })(withRouter(Register))
