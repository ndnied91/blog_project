
import axios from 'axios'
// import { withCookies } from 'react-cookie';

import Cookies from 'js-cookie'
import swal from 'sweetalert';


//used by destinations page
export const fetchAllBlogs = () => async dispatch => {
  const res = await axios.get(`/api/blogs`)
   dispatch({ type: 'FETCH_ALL_BLOGS' , payload: res.data})

}

//FOR PAGINATION
export const blogCount = () => async dispatch => {
  const res = await axios.get(`/api/blog_count`)
   dispatch({ type: 'BLOG_COUNT' , payload: res.data.count})

}




export const fetchBlogsByState = (state) => async dispatch => {
  const res = await axios.get(`/api/destinations/${state}`)
  // console.log(res)
   dispatch({ type: 'FETCH_STATE_BLOGS' , payload: res.data})

}



//THIS IS FOR PAGINATION
//CHECK BLOGLIST -> PAGINATION FUNCTION TO UPDATE HOW MANY BLOGS PER PAGE
export const fetchBlogs = ( skip=0 , limit= 5 ) => async dispatch => {
  const res = await axios.get(`/api/blogs?skip=${skip}&limit=${limit}`)
   dispatch({ type: 'FETCH_BLOGS' , payload: res.data})
}


//make a call to this api with params that return the specific number of blogs
export const fetchIndividualBlog = (title) => async dispatch => {
  const res = await axios.get(`/api/blogs/${title}`)
   dispatch({ type: 'CURRENT_BLOG' , payload: res.data[0]})
}


//this call does not make any external calls
export const fetchCurrentBlog = ( id=null) => {
  return ({ type: 'CURRENT_BLOG' , payload : id })
  }



//THIS IS JUST FOR THE FAVORITES
  export const fetchFavorites = ( skip=0 , limit= 10 ) => async dispatch => {
    const res = await axios.get(`/api/blogs/favorites`)
    console.log(res)
     dispatch({ type: 'FETCH_FAVORITES' , payload: res.data})

  }




export const fetchUser = () => async dispatch => {
    const res = await axios.get(`/api/current_user/user`)


      dispatch({ type: 'FETCH_USERNAME' , payload : res.data.username })
  }



  export const submitPost = (values, history) => async dispatch => {
    const res = await axios.post('/api/blogs', values)
    console.log(res)
    history.push('/')
    dispatch({ type: 'FETCH_USER' , payload : res.data })

  }







export const checkUser = (values , history) => async dispatch => {

  const res = await axios.post('/api/login', values)

  if(res.data === 'password is incorrect' || res.data === 'No User Exists'){
    history.push('/login')
    window.alert("Username/Password is incorrect.");
      dispatch({ type: 'ERROR_MSG' , payload : res.data })
  }
  else{

       Cookies.set('username' , res.data)
      history.push('/dashboard')



        dispatch({ type: 'FETCH_USER' , payload : res.data })
        dispatch({ type: 'ERROR_MSG' , payload : null })
  }

}







export const addUser = (values , history) => async dispatch => {
  history.push('/dashboard')
  const res = await axios.post('/api/user', values)
  dispatch({ type: 'FETCH_USER' , payload : res.data })

}



export const setPermaCookie = (history) => async dispatch => {
  const res = await axios.get('/api/current_user/id')

      if(res.data.error === 'You must log in'){
          // console.log(' user not signed in , setting perma as null')
          dispatch({ type: 'SET_PERMA' , payload: null })
      }

       else{
           // console.log(' user  signed in , setting perma as user id')
           Cookies.set('permaCookie' , res.data)
           dispatch({ type: 'SET_PERMA' , payload: res.data})
       }

}




//DELETE BLOGS ROUTE

export const deleteBlog = (id , history) => async dispatch =>{
  // const res = await axios.delete(`/api/delete/${id} `)

  console.log(id)
  const res = await axios.get(`/api/blogs/delete/${id}`)
  history.push('/')
  dispatch({ type: 'FETCH_BLOGS' , payload: res.data})

}




export const updateBlog = (id , history) => async dispatch =>{
  const res = await axios.post(`/api/blogs/edit/${id._id}` , id)
   dispatch({ type: 'CURRENT_BLOG' , payload: res.data})

}






export const submitEditPost = (values , history) => async dispatch => {
  const res = await axios.post('/api/blogs', values)
  dispatch({ type: 'FETCH_USER' , payload : res.data })
}





//////beta
export const updatePage = (number) => {
  return ({ type: 'CURR_PAGE' , payload : number })
  }





  ///this is for getting simliar BLOGS

  export const getSimliarBlogs = (title) => async dispatch => {
    const res = await axios.get(`/api/blogs/${title}/tags`)
    // console.log(res.data)
     dispatch({ type: 'RELATED_BLOGS' , payload: res.data})
}





export const getTags = () => async dispatch => {
  const res = await axios.get(`/api/tags`)
   dispatch({ type: 'TAGS' , payload: res.data})
}





//THIS ROUTE IS JUST FOR FEEDBACK FROM CONTACT PAGE
export const postFeedback = (values) => async dispatch => {
  await axios.post(`/api/feedback` , values)
  swal("Thank you!", "Please allow 24-48 hours for review", "success")
}






//THIS ROUTE IS FOR GETTING FEEDBACK FROM THE DATABASE
export const getFeedback = () => async dispatch => {
  const res = await axios.get(`/api/feedback`)
  console.log(res)

   dispatch({ type: 'FETCH_FEEDBACK' , payload: res.data})
}
