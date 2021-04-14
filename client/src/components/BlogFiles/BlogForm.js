//this shows a form for a user to add input

import React from 'react'
import _ from 'lodash'
import ReactQuill from 'react-quill'; // ES6 //ADDDDDDEDDD THIS
import {connect} from 'react-redux'
import { getTags , previewBlog} from '../../actions'
import {reduxForm,Field} from 'redux-form'
//alows to connect to redux store
//basically the same as the connect helper
import { Link } from 'react-router-dom'

import CreateMap from './CreateMap'


class BlogForm extends React.Component{

  constructor(props) {
  super(props)

   const { title, body, image , summary, state , instagram , tags , lng, lat, zoom} = this.props.preview

  this.state = { title: title ,
                body: body,
                image: image,
                summary: summary,
                state: state ,
                instagram: instagram,
                tags: tags,
                lng: lng,
                lat: lat,
                zoom: zoom
              } // You can also pass a Quill Delta her
}

onInputchange =(event)=> {
   this.setState({
     [event.target.name]: event.target.value
   });
 }



 onInputchangeBod =(event)=> {
    this.setState({ body: event });
  }




renderQuill = ({ input })=> {
    return (
      <ReactQuill
        {...input}

        style={{backgroundColor: '#fff' , display: "block" , width: "100%" , marginBottom: "20px" }}
        placeholder='body'
        value={this.state.body}
        modules = {{ toolbar: true }}

         onChange={(newValue, delta, source) => {
           if (source === 'user') {
             input.onChange(newValue);
           }
         }}

        onBlur={(range, source, quill) => {
          input.onBlur(quill.getHTML());
        }}

      />
    );
  }




  render(){








    const onSubmitForm= ( event )=>{
      event.preventDefault()
      this.props.onBlogSubmit()
      this.props.previewBlog(this.state)

    }




    return(
      <div className="container">
        <form onSubmit={this.onSubmitForm}>
                <br></br>

                <h1 className="text-center"> Create a new blog here </h1>

                <input className="form-control" style={{height: '55px' , marginBottom: "20px"}}  name="title" type="text"  placeholder="Enter a title" value={this.state.title} onChange={this.onInputchange} required />

                <Field
                  name="communityBody" key="communityBody" theme={"bubble"}
                  onChange={this.onInputchangeBod} component={this.renderQuill} />

                <input className="form-control" style={{height: '55px' , marginBottom: "20px"}} required name="image" type="text" placeholder="Enter an image url" value={this.state.image} onChange={this.onInputchange}  />
                <input className="form-control" style={{height: '55px' , marginBottom: "20px"}} required name="summary" type="text"  placeholder="Enter a quick summary " value={this.state.summary} onChange={this.onInputchange} />

                <select className="form-control" style={{marginBottom: '20px', height: '55px', color: '#666666' }} required name="state" type="text"  value={this.state.state} onChange={this.onInputchange} >

                <option > Please select a state </option>
                <option value='alabama'> Alabama </option>
                <option value='alaska'> Alaska </option>
                <option value='arizona'> Arizona </option>
                <option value='arkansas'> Arkansas </option>
                <option value='california'> California </option>
                <option value='colorado'> Colorado </option>
                <option value='connecticut'> Connecticut </option>
                <option value='delaware'> Delaware </option>
                <option value='florida'> Florida </option>
                <option value='georgia'> Georgia </option>
                <option value='hawaii'> Hawaii </option>
                <option value='idaho'> Idaho </option>
                <option value='illinois'> Illinois </option>
                <option value='indiana'> Indiana </option>
                <option value='iowa'> Iowa </option>
                <option value='kansas'> Kansas </option>
                <option value='kentucky'> Kentucky </option>
                <option value='louisiana'> Louisiana </option>
                <option value='maine'> Maine </option>
                <option value='maryland'> Maryland </option>
                <option value='massachusetts'> Massachusetts </option>
                <option value='michigan'> Michigan </option>
                <option value='minnesota'> Minnesota </option>
                <option value='mississippi'> Mississippi </option>
                <option value='missouri'> Missouri </option>
                <option value='montana'> Montana </option>
                <option value='nebraska'> Nebraska </option>
                <option value='nevada'> Nevada </option>
                <option value='new-hampshire'> New Hampshire </option>
                <option value='new-jersey'> New Jersey </option>
                <option value='new-mexico'> New Mexico </option>
                <option value='new-york'> New York</option>
                <option value='north-carolina'> North Carolina </option>
                <option value='north-dakota'> North Dakota </option>
                <option value='ohio'> Ohio </option>
                <option value='oklahoma'> Oklahoma </option>
                <option value='oregon'> Oregon </option>
                <option value='pennsylvania'> Pennsylvania </option>
                <option value='rhode-island'> Rhode Island </option>
                <option value='south-carolina'> South Carolina </option>
                <option value='south-dakota'> South Dakota </option>
                <option value='tennessee'> Tennessee </option>
                <option value='texas'> Texas </option>
                <option value='utah'> Utah </option>
                <option value='vermont'> Vermont </option>
                <option value='washington'> Washington </option>
                <option value='west-virginia'> West Virginia </option>
                <option value='wisconsin'> Wisconsin </option>
                <option value='wyoming'> Wyoming </option>
                </select>


               <input className="form-control" style={{height: '55px' , marginBottom: "20px"}} name="instagram" type="text"  placeholder="What is your instagram " value={this.state.instagram} onChange={this.onInputchange} />
               <input className="form-control" style={{height: '55px' , marginBottom: "20px"}} required name="tags" type="text" value={this.state.tags} placeholder='tags - use space or commas to seperate tags' onChange={this.onInputchange} />



              <CreateMap  getCoords={ (lat,lng)=> this.setState({lat,lng}) } />


                <div className="row">
                    <div className="col-12 col-md-8">
                      <button className="btn btn-outline-secondary btn-lg btn-block" type="submit"  onClick={onSubmitForm}> Next </button>
                      <br/>
                    </div>

                    <div className="col-12 col-md-4" >
                      <Link className="btnStyle"  to ="/dashboard"><button className="btnStyle btn btn-outline-danger btn-lg btn-block " >Cancel </button>  </Link>
                    </div>
                </div>




        </form>
      </div>
    )
  }
}






const mapStateToProps = (state)=>{
  console.log(state)
return {tags: state.tags , preview: state.preview}
}


// export default connect( mapStateToProps , {getTags , previewBlog} )(BlogForm)




export default reduxForm({
  form: 'surveyForm',
  destroyOnUnmount: false
})(connect(mapStateToProps , {getTags , previewBlog})(BlogForm))
