import React from 'react'
import { connect } from 'react-redux'
import { fetchFavorites } from '../actions'

import { Link } from 'react-router-dom'

import Header from './Header'

class Favorites extends React.Component{

  componentDidMount() {
    this.props.fetchFavorites()
  }

  render(){




    const renderContent = () => {
      return this.props.blogs.map((blog, index) => {
        return (
          <div key={index} >
                        <span className="card-title "> <Link to={`/blogs/${blog.title}`} className="nav-link">  <img  className="card-img cardStyle"  src={blog.image} width="100%" height='auto'  alt={blog.title}/>   </Link> </span>
                           <div className="card-body" >
                              <h5 className="card-title" > <Link to={`/blogs/${blog.title}`} className="nav-link blogStyle"><p>{blog.title.split('-').join(' ')}</p> </Link> </h5>
                                <p className="card-text"><small className="text-muted" style={{fontSize: '12px'}}> {blog.created} </small></p>
                                <p className="card-text "> {blog.summary}</p>
           </div>
              <p className='borderStyle'/>
          </div>
        )
      })
    }







    return(
      <div >
      <Header/>



             <div className="title text-center"> Top Visited Blogs </div>

               <div className="container">
                    {renderContent()}
          </div>



       </div>
    )
  }
}



const mapStateToProps =(state)=>{
  return { blogs : state.favorites }
}

export default connect(mapStateToProps , {fetchFavorites})(Favorites)
