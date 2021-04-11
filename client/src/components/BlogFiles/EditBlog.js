

import React from 'react'



import {withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

import { updateBlog ,fetchIndividualBlog } from '../../actions'

//alows to connect to redux store
//basically the same as the connect helper

import { Field } from 'redux-form'


import ReactQuill from 'react-quill'; // ES6 //ADDDDDDEDDD THIS

import '../../srcStyles.css'

class EditBlog extends React.Component{
  constructor(props) {
      super(props);

      this.state = { title: this.props.blog.title , body: this.props.blog.body ,
                    image: this.props.blog.image , summary: this.props.blog.summary , state: this.props.blog.state,
                    tags: this.props.blog.tags
                        };
        //IM SURE THIS CAN BE DONE EASIER BUT IT WORKS SO WHATEVA

        this.onInputchange = this.onInputchange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }


    onInputchange(event) {
       this.setState({
         [event.target.name]: event.target.value
       });
     }


     onInputchangeBod =(event)=> {
        this.setState({ body: event });
      }



    async onSubmitForm(){
    const verifyTags=(tags)=>{

      // console.log(typeof tags)
        if(typeof tags === 'string'){
         console.log(tags= tags.split(/[ ,]+/))
           return tags
        }
        else{
            return tags
        }

      }

      let updatedBlog = { _id:this.props.blog._id ,
                        title: this.state.title.trim().split(' ').join('-'),
                        body: this.state.body,
                        image: this.state.image,
                        summary: this.state.summary,
                        state: this.state.state,
                        tags: verifyTags(this.state.tags)

                        }
      await this.props.updateBlog(updatedBlog, this.props.history)
      await this.props.fetchIndividualBlog(this.state.title)



    }


//////////////////////////////////////////////
  renderQuill = ({ input })=> {
      return (
        <ReactQuill
          style={{backgroundColor: '#fff' , display: "block" , width: "100%" , marginBottom: "20px" }}
          {...input}

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
//////////////////////////////////////////////




  render(){

    const onClick=async()=>{
      await this.onSubmitForm()
      this.props.hideForm()
    }

    // console.log(this.props.hideForm)

    return(
      <div className="container">

      <h1 className="text-center" style={{paddingTop: '25px', marginBottom: "20px"}}> Please Review the Blog </h1>

      <div>
          Title :
          <input className="form-control" style={{height: '55px' , marginBottom: "20px"}} name="title" type="text" value={this.state.title} onChange={this.onInputchange} />
      </div>


          <label> Body: </label>

          <Field
          style={{height: '55px' , marginBottom: "20px"}}
          name="body"
          key="body"
          className="form-control"
          theme={"bubble"}
          onChange={this.onInputchangeBod}
          component={this.renderQuill} />


      <div>
          Image :
          <input className="form-control" style={{height: '55px' , marginBottom: "20px"}} name="image" type="text" value={this.state.image} onChange={this.onInputchange} />
      </div>


      <div>
          Sumary :
          <input className="form-control" style={{height: '55px' , marginBottom: "20px"}} name="summary" type="text" value={this.state.summary} onChange={this.onInputchange} />
      </div>


      <div>
          State :
          <select className="form-control" style={{height: '55px' , marginBottom: "20px"}} name="state" type="text" value={this.state.state} onChange={this.onInputchange} >

          <option/>
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
      </div>


      <div>
          Tags :
          <input className="form-control" style={{height: '55px' , marginBottom: "20px"}} name="tags" type="text" value={this.state.tags} placeholder='tags - use space or commas to seperate tags' onChange={this.onInputchange} />
      </div>






      <div className="row">
          <div className="col-12 col-md-8">
            <button className="btn btn-outline-secondary btn-lg btn-block" type="submit"  onClick={()=>onClick()}> Submit </button>
            <br/>
          </div>

          <div className="col-12 col-md-4" >
            <button className="btnStyle btn btn-outline-danger btn-lg btn-block" type="submit"  onClick={this.props.onCancel} > Cancel </button>

          </div>
      </div>








    </div>

    )
  }
}



const mapStateToProps = (state)=>{
  return { blog: state.currentBlog}
}

export default connect(mapStateToProps , {updateBlog , fetchIndividualBlog})(withRouter(EditBlog))
