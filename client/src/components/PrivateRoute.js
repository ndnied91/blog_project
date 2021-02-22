import React from 'react'

import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import BlogDashboard from './BlogFiles/BlogDashboard'

const fakeAuth = {
  isAuthenticated : true
}

console.log(fakeAuth)

const PrivateRoute = ({ component: BlogDashboard, ...rest }) => (

  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true ? <BlogDashboard {...props} />   : <Redirect to='/login' /> )} />
)


export default PrivateRoute
