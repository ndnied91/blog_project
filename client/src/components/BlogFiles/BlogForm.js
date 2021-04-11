//this shows a form for a user to add input

import React from 'react'
import _ from 'lodash'
import ReactQuill from 'react-quill'; // ES6 //ADDDDDDEDDD THIS
import {connect} from 'react-redux'
import { getTags} from '../../actions'
import {reduxForm, Field} from 'redux-form'
//alows to connect to redux store
//basically the same as the connect helper
import { Link } from 'react-router-dom'

import InputText from './InputText'

import CreateMap from './CreateMap'

const formFields = [
  {label: 'Blog Title' , name: 'title', type: 'text'},
  {label: 'Body', name: 'body' , type :'text'},
  {label: 'Summary', name: 'summary' , type :'input'},
  {label: 'Image', name: 'image' , type: 'text' },
  {label: 'State', name: 'state' , type: 'text' },
  {label: 'Tags', name: 'tags' , type: 'text' },
  {label: 'lat' , name: 'lat',  type: 'text' },
  {label: 'lng' , name: 'lng',  type: 'text' },
  {label: 'accountno' ,name: "accountno" }
]




function renderQuill({ input }) {
  return (
    <ReactQuill

    style={{backgroundColor: '#fff' , display: "block" , width: "100%" , marginBottom: "5px" }}

      {...input}

      modules = {{
         toolbar: [
           [{ 'header': [1, 2, false] }],
           ['bold', 'italic', 'underline','strike', 'blockquote'],
           [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
           ['link', 'image'],
           ['clean']
         ],
       }}


      placeholder='Body'

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


class BlogForm extends React.Component{

  constructor(props) {
  super(props)
  this.state = { text: ''  , lng: null, lat: null, zoom: 9} // You can also pass a Quill Delta here
  this.handleChange = this.handleChange.bind(this)
}

handleChange(value) {
    this.setState({ text: value })
  }


async componentDidMount(){
  await this.props.getTags()
}



// componentDidMount() {
//     this.props.initialize({ accountno: null });
//     // set the value individually
//
//   }



  render(){

        const showTags = () =>{
          if(this.props.tags !== null){
            return this.props.tags.map((tag)=>{
              return <span className="btn btn-link disabled"> {tag} </span>
            })
          }
        }





    return(
      <div className="container">
        <form onSubmit={this.props.handleSubmit(this.props.onBlogSubmit)}>
                <br></br>

                <h1 className="text-center"> Create a new blog here </h1>
                <br/>

                <div >

                  <Field className="form-control"  style={{marginBottom: '5px', height: '55px'}} key='title'  component='input'  type='text'  label='title'  name= 'title' placeholder='Title'  />

                  <Field  classname="form-control" name="body"  theme={"bubble"}  component={renderQuill} />

                  <Field className="form-control"  style={{marginBottom: '5px', height: '55px'}} key='summary'  component='input'  type='text'  label='summary'  name= 'summary' placeholder='Summary' />
                  <Field className="form-control"  style={{marginBottom: '5px', height: '55px'}} key='image'  component='input'  type='text'  label='image'  name= 'image' placeholder='Image' />

                  <Field className="form-control" style={{marginBottom: '5px', height: '55px'}} key='state' name="state" component="select" >

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
                  </Field>


                  <Field className="form-control"  style={{marginBottom: '5px', height: '55px'}} key='tags'  component='input'  type='text'  label='image'  name= 'tags' placeholder='tags - use space or commas to seperate tags' />

                    <div style={{marginBottom: '20px', color: 'red' , fontSize: '15px'}}> {this.props.touched && this.props.error} </div>

                  {showTags()}


                    <CreateMap  getCoords={ (lat,lng)=>{
                        // this.props.initialize({ lat :lat , lng: lng})
                        this.setState({lat,lng})
                        }
                       }/>


                   <Field component="text"  name="lat" label='lat' type="text">
                     <input className="form-control" style={{height: '55px' , marginBottom: "20px"}}  name="lat" key="lat" label='lat' type="text" placeholder="Latitude" value={this.state.lat}  />
                   </Field>

                   <Field component="text" name="lng" label='lng' type="text"  value={this.state.lng}>
                     <input className="form-control" style={{height: '55px' , marginBottom: "20px"}}  name="lng"  label='lng'  placeholder="Longitude" value={this.state.lng}  />
                   </Field>


                   <Field className="form-control"  style={{marginBottom: '5px', height: '55px'}} key='lat'  component='input'  type='text'  label='lat'  name= 'lat'  placeholder='Latitude' value={this.state.lat}  />
                   <Field className="form-control"  style={{marginBottom: '5px', height: '55px'}} name="lng"  component='input'  type='text'  label='lng'  placeholder='Longitude' value={this.state.lng} />





                </div>




                <div className="row">
                    <div className="col-12 col-md-8">
                      <button className="btn btn-outline-secondary btn-lg btn-block" type="submit"> Next </button>
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



function validate(values){
  const errors = {}

    _.each(formFields, ({name})=>{
        if(!values[name]){
          errors[name] = `You must provide a value`
        }

    })


  return errors;
  //if empty, its good to go, if theres anything inside it, then form assumes something is invalid
}




const mapStateToProps = (state)=>{
  return {tags: state.tags}
}



export default reduxForm({
  form: 'surveyForm',
  destroyOnUnmount: false

})(connect(mapStateToProps , {getTags})(BlogForm))
