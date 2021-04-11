import {combineReducers} from 'redux'
import {reducer as reduxForm} from 'redux-form' // reducer for redux form


import authReducer from './authReducer'
import blogsReducer from './blogsReducer'

import errorsReducer from './errorsReducer'

import setPermaReducer from './setPermaReducer'

import currentBlogReducer from './currentBlogReducer'

import currentPageReducer from './currentPageReducer'

import fetchAllBlogsReducer from './fetchAllBlogsReducer'

import blogsByStateReducer from './blogsByStateReducer'

import totalBlogCountReducer from './totalBlogCountReducer'

import relatedBlogsReducer from './relatedBlogsReducer'

import favoritesReducer from './favoritesReducer'

import commReviewBlogReducer from './commReviewBlogReducer'

import commApprovedBlogReducer from './commApprovedBlogReducer'

import currentReviewCommunitytBlogReducer from './currentReviewCommunitytBlogReducer'

import tagsReducer from './tagsReducer' //gets all tags from database


import currrentUserNameReducer from './currrentUserNameReducer'// getting the current users name, this is for the hello message


import feedbackReducer from './feedbackReducer'



import previewReducer from './previewReducer'

import fetchFeaturedReducer from './fetchFeaturedReducer' //this is for getting featured blogs into dash

export default combineReducers({
  auth: authReducer,
  blogs: blogsReducer,
  currentBlog: currentBlogReducer,
  error: errorsReducer,
  form: reduxForm,
  permaCookie : setPermaReducer,
  currentPage :currentPageReducer,
  allBlogs :fetchAllBlogsReducer,
  byStateBlogs: blogsByStateReducer,
  blogCount: totalBlogCountReducer,
  relatedBlogs: relatedBlogsReducer,
  favorites: favoritesReducer,
  communityBlogReview: commReviewBlogReducer,
  communityBlogsApproved : commApprovedBlogReducer,
  currentCommunitytBlog: currentReviewCommunitytBlogReducer,
  tags : tagsReducer,
  username: currrentUserNameReducer,
  feedback: feedbackReducer, //this is for getting feedback from users
  preview: previewReducer, //this is for getting the preview to work
  featuredBlogs : fetchFeaturedReducer  //this is for getting featured blogs into dash
})
