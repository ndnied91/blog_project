//shows users their forms inputs for review
import React from 'react'


// import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import ReactQuill from 'react-quill'; // ES6 //ADDDDDDEDDD THIS
import {withRouter} from 'react-router-dom'

import { Field} from 'redux-form'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import _ from 'lodash'


const BlogReview = (props) => {


  function renderQuill({ input }) {
    return (
      <ReactQuill
        {...input}
        value={props.formValues.body}
        style={{backgroundColor: 'white' , paddingBottom: '20px'}}

        modules = {{
           toolbar: false

         }}
         readOnly={true}

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


//THIS WAS EXPANDED TO BE ABLE TO RENDER THE RICH TEXT


function preSubmitEdit(values, history){
  //THIS FIXES THE ISSUE OF THE URL
    values.title = values.title.trim().split(' ').join('-').trim()
    values.tags =_.uniq(values.tags.split(/[ ,.]+/))


    props.submitPost(values, history)
}


  return(

    <div className="container">
    <h1 class="text-center" style={{paddingTop: '25px', marginBottom: "20px"}}> Please Review the Blog! </h1>



    <label> Title:  </label>
          <div className="form-control"  key={props.formValues.title} style={{height: '55px' , marginBottom: "20px"}}>
              <div style={{ height: '45px'}} className="page-hero d-flex align-items-center"> {props.formValues.title} </div>
    </div>

    <label> Body: </label>

                 <Field  style={{height: '55px' , marginBottom: "20px"}}
                 name="body"
                 key={props.formValues.body}
                 className="form-control"
                 placeholder='Title'
                 theme={"bubble"}
                 component={renderQuill} />


    <label> Summary:  </label>
          <div className="form-control"  key={props.formValues.summary} style={{height: '55px' , marginBottom: "20px"}}>
              <div style={{ height: '45px'}} className="page-hero d-flex align-items-center"> {props.formValues.summary} </div>
    </div>

    <label> Image:  </label>
          <div  style={{height: 'auto' }} key={props.formValues.image} style={{height: 'inherit' ,  marginBottom: "20px"}}>
                    <img  className="card-img cardStyle"  src={props.formValues.image} width="100%" height='auto' />
          </div>


    <label> State:  </label>
          <div className="form-control"  key={props.formValues.state} style={{height: '55px' , marginBottom: "20px"}}>
              <div style={{ height: '45px'}} className="page-hero d-flex align-items-center"> {props.formValues.state} </div>
    </div>


    <label> Tags:  </label>
          <div className="form-control"  key={props.formValues.tags} style={{height: '55px' , marginBottom: "20px"}}>
              <div style={{ height: '45px'}} className="page-hero d-flex align-items-center"> {props.formValues.tags} </div>
    </div>






              <div class="row">
                  <div class="col-12 col-md-6"  onClick={ ()=> preSubmitEdit(props.formValues, props.history)} >
                    <button class="btnStyle btn btn-outline-secondary btn-lg btn-block" > Submit Blog </button>
                      <br/>
                  </div>

                  <div class="col-12 col-md-6">
                    <button class="btn btn-outline-danger btn-lg btn-block" type="submit"  onClick={props.onCancel} > Cancel </button>
                  </div>

              </div>




    </div>
  )
}


const mapStateToProps = ({form})=>{
  // console.log({form})
  return { formValues : form.surveyForm.values}
}




export default connect(mapStateToProps, actions )(withRouter(BlogReview))
