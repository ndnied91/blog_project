import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import About from './About'
import Contact from './Contact'
import Archives from './Archives'
import Favorites from './Favorites'
import TravelTips from './TravelTips'
import Destinations from './Destinations'


import BlogDashboard from './BlogFiles/BlogDashboard'
import BlogNew from './BlogFiles/BlogNew'
import Login from './UserFiles/Login'
import Register from './UserFiles/Register'
import BlogsList from './BlogFiles/BlogsList'
import IndividualBlog from './BlogFiles/IndividualBlog'
import BlogByState from './BlogFiles/BlogByState'



import Community from './CommunityBlog/Community'
import CommunityReview from './CommunityBlog/CommunityReview'
import IndiCommBlogReview from './CommunityBlog/IndiCommBlogReview'
import CommunityIndBlog from './CommunityBlog/CommunityIndBlog'



import Footer from './Footer'

import {setPermaCookie } from '../actions'
import { withCookies } from 'react-cookie';
import {connect} from 'react-redux'

import axios from 'axios'

import Cookies from 'js-cookie'

class App extends React.Component{


 async componentDidMount(){


      this._div.scrollTop = 0

       axios.get('/api/current_user/user').then(function(result) {
         if(result.data.error){
           console.log(result.data.error)

           Cookies.remove('permaCookie' )
           Cookies.remove('username' )

          //this checks if the user is logged in on the backend, if they are not logged in and
          //cookies are still set, reset cookies

          //this ensures that if the server gets shut down and restarted, user will have to relog into the site

         } else{
           // console.log(result.data)
         }
       });
}





 updateUser(){


    const { cookies } = this.props;

    let currentUser =  cookies.get('username')
    let permaCookie = cookies.get('permaCookie')



  //if cookie is set however the user is not looged in on the server side, reset cookie


      if( (currentUser !== undefined || this.user !== undefined)  ){
        //this might need to be revised but it works for now
                if( permaCookie === null){
                  return false
                }
                else{
                    return true
                }


      }
      else{
        return false
      }

}





  render(){

        const PrivateRoute = ({ component: Component, ...rest }) => (
          <Route {...rest} render={(props) => (
            this.updateUser() ? <BlogDashboard {...props} /> : <Redirect to='/login' />
          )} />
        )






    return(

          <div ref={(ref) => this._div = ref}>
                <BrowserRouter>
                    <div style={{paddingBottom: '500px' }}>
                      <Switch>
                        <Route exact path="/" component={BlogsList} />
                        <Route exact from="/blogs" component={BlogsList} />
                      </Switch>

                        <Route path="/blogs/:title" component={IndividualBlog}/>

                        <Route exact path="/about"   component={About}/>
                        <Route exact path="/archives" component={Archives}/>
                        <Route exact path="/favorites" component={Favorites}/>
                        <Route exact path="/contact" component={Contact}/>



                        <Route exact path="/travel-tips" component={TravelTips}/>
                        <Route exact path="/destinations" component={Destinations}/>
                        <Route exact path="/destinations/:state" component={BlogByState}/>
                        <Route exact path="/community" component={Community}/>

                        <Route exact path="/community/:title" component={CommunityIndBlog}/>

                        <Switch>
                          <Route exact path="/login" component={Login}/>
                          <PrivateRoute path="/dashboard" component={BlogDashboard}/>
                        </Switch>


                        <Route exact path="/dashboard/blogs/new" component={BlogNew}/>
                        <Route exact path="/dashboard/review" component={CommunityReview}/>
                        <Route exact path="/dashboard/review/:title" component={IndiCommBlogReview}/>
                        <Route exact path="/register" component={Register}/>



                   </div>

                   <Footer/>
                </BrowserRouter>


            </div>

    )
  }
}



const mapStateToProps =(state) =>{
  // console.log(state)
  return {user: state.auth , statePermaCookie : state.permaCookie }
}

export default connect(mapStateToProps,{ setPermaCookie  })(withCookies(App))
