
import axios from 'axios'
// import { withCookies } from 'react-cookie';

import Cookies from 'js-cookie'


import swal from 'sweetalert';

import SweetAlert from 'react-bootstrap-sweetalert';


//THIS IS STRICTLY FOR COMMUNITY BLOGS, BEFORE BEING REVIEWED
  export const submitCommunityPost = (values, history) => async dispatch => {
    const res = await axios.post('/api/blogs/community', values)
    console.log(values )


    if(res.status === 200){
      history.push('/')
      swal("Good job!", "You clicked the button!", "success")

    }
    else if(res.status !== 200){
      swal("Oops!", "Something went wrong!", "error");
    }

}


//THIS GETS ALL APPROVED BLOGS
  export const fetchApprovedCommBlogs = () => async dispatch => {
    const res = await axios.get('/api/blogs/community/approved')
    // console.log(res)
    dispatch({ type: 'COMMUNITY_BLOGS' , payload: res.data}) //APROVED BLOGS
  }


  //THIS INDIVIDUAL APPROVED BLOG
    export const fetchApprovedCommBlog = (title) => async dispatch => {

      if(title === null){
      dispatch({ type: 'CURRENT_COMM_BLOG' , payload: null }) //APROVED BLOGS
      }


      else{
        const res = await axios.get(`/api/blogs/community/approved/${title} `)
        dispatch({ type: 'CURRENT_COMM_BLOG' , payload: res.data[0]}) //APROVED BLOGS
      }

    }



//AFTER BLOG REVIEW , GETS SUBMITTED
  export const submitReviewedCommunityPost = (values, history) => async dispatch => {
    const res = await axios.post('/api/blogs/community/review', values)
      history.push('/dashboard/review')
       // dispatch({ type: 'COMMUNITY_BLOGS_REVIEW' , payload: res.data})
  }


// FOR COMMUITY BLOGS THAT NEED TO BE REVIEWED
  export const fetchBlogsForReview = () => async dispatch => {
    const res = await axios.get(`/api/blogs/community/prereview`)
    // console.log(res)
     dispatch({ type: 'COMMUNITY_BLOGS_REVIEW' , payload: res.data}) //REVIEW PAGE
  }



// FOR INDIVIDUAL COMMUITY BLOGS THAT NEED TO BE REVIEWED
  export const fetchIndBlogForReview = (title) => async dispatch => {
    if(title === null){
      dispatch({ type: 'CURRENT_COMM_BLOG' , payload: null})
    }
    else{
      const res = await axios.get(`/api/blogs/community/${title}`)
       dispatch({ type: 'CURRENT_COMM_BLOG' , payload: res.data[0]})
    }

  }









//DELETES BLOG FROM COMMUNITY REVIEW
  export const deleteFromPending = (blog, history) => async dispatch => {
    await axios.delete(`/api/blogs/community/${blog.title} `)
    history.push('/dashboard/review')
  }





//delete community blog is key is correct
export const deleteCommunityBlog = (values, history) => async dispatch => {
  const res = await axios.post(`/api/blogs/community/user/${values.blog_id}` , values)

  if(res.data.error){
    swal("Please try again", "Wrong key provided!", "error");
    history.push(`/community/${values.title}`)
  }
  else if(res.data.success){
    swal("Blog Deleted", "success")
    history.push('/community')
  }
}
