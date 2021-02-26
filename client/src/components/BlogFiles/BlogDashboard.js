// MAIN DASHBOARD


import React from 'react'
import { BrowserRouter, Link , Route} from 'react-router-dom'
// import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchUser, setPermaCookie, fetchCurrentBlog , getFeedback} from '../../actions'

import {fetchBlogsForReview  } from '../../actions/communityIndex'
import { withCookies } from 'react-cookie';
import Header from '../Header'

import styled  from 'styled-components'


class Dashboard extends React.Component{


  async componentDidMount(){
    await this.props.setPermaCookie(this.props.history)
    this.props.fetchBlogsForReview()
    this.props.getFeedback() //gets feedback from users

  }



      render(){

        const Button = styled.button`
        background: transparent;
        border-radius: 4px;
        color: palevioletred;
        margin: 0 1em;
        padding: 0.25em 1em;
      `;



      const notifcation=()=>{
        if(this.props.reviewCount>0){
          return 'red'
        }
        return ''
      }


      const renderButtons=()=>{
        return(
          <div style={{paddingBottom: '20px'}}>

          <center>
                 <br/>

                <Button> <Link to ="/dashboard/blogs/new" className="btn-floating btn-large red"> New Post </Link> </Button>
                <Button> <Link to ="/"> View all Blogs  </Link> </Button>

                <Button > <Link to ="/dashboard/featured" className="btn-floating btn-large"> Featured  </Link> </Button>

                <Button onClick={this.props.fetchCurrentBlog} > <Link style={{color : notifcation() }} to ="/dashboard/review" className="btn-floating btn-large"> Review  </Link> </Button>

                <Button><a href="/api/logout"> Logout </a></Button>
          </center>

          </div>
        )
      }



      const renderFeedback=()=>{
        if(this.props.comments.length> 1){
          return this.props.comments.map( (comment)=> {
              return(
                <div style={{paddingBottom: '30px'}}>
                  <span>  {comment.topic} </span>
                  <span>   {comment.created} </span>
                  <span>  {comment.comment} </span>
                 </div>
              )
          })
        } //end of if props
        else
          return null

      }





        return(
            <div>
               <Header/>

               <div className="container">
                  {renderButtons()}

                  <div  className="card" style={{ float: 'right' , width: '30%', paddingTop: '10px' }}>

                  <div>

                    <center> <h3>Recent Feedback: </h3> </center>
                    {renderFeedback()}

                   </div>

                   </div>


               </div>




            </div>

           )
      }

}

const mapStateToProps = (state) => {
  return { username : state.auth ,
          permaCookie : state.permaCookie  ,
          reviewCount: state.communityBlogReview.length,
          comments : state.feedback

        }
}

export default connect(mapStateToProps , {fetchUser , setPermaCookie, fetchBlogsForReview , fetchCurrentBlog , getFeedback})(withCookies(Dashboard))
