import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import  {checkUser}  from '../../actions'

import Header from '../Header'

import LoginForm from './LoginForm'

class Login extends React.Component{

  onSubmit =(formValues)=>{
    this.props.checkUser(formValues, this.props.history)
  }

  render(){






    return(
      <div >
      <Header/>

      <br/>

      <div class="text-center" style={{marginLeft: '20%' , marginRight: '20%', width: '60%'}}>
          <p style={{fontSize: '25px'}}> Please log in</p>

          <LoginForm onSubmit={this.onSubmit}/>

       </div>
       </div>
    )
  }
}






export default connect(null, { checkUser })(withRouter(Login))
