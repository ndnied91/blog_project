import React from 'react'

import Header from '../Header'

import PreviewCommunityPage from './PreviewCommunityPage'

import {withRouter , Link} from 'react-router-dom'

import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'

import {  previewBlog } from '../../actions/communityIndex.js'

import swal from 'sweetalert';
import ReactQuill from 'react-quill'; // ES6 //ADDDDDDEDDD THIS

class CommunityForm extends React.Component{
  constructor(props){
    super(props)


    const {preview} = this.props
    this.state = { title: preview.title   ,
                   author: preview.author ,
                   communityBody: preview.communityBody  ,
                   image: preview.image  ,

                   summary: preview.summary  ,
                   state: preview.state ,
                   tags: preview.tags ,
                   secret: preview.secret  ,
                   featured: preview.featured
                 };



                 // this.state = { title:  ''  ,
                 //                author: '' ,
                 //                communityBody: ''  ,
                 //                image: ''  ,
                 //                summary:''  ,
                 //                state: '' ,
                 //                tags: '' ,
                 //                secret: ''  ,
                 //                featured: false
                 //              };



    this.onInputchange = this.onInputchange.bind(this);
    this.onInputchangeBod = this.onInputchangeBod.bind(this);
    this.checkbox = this.checkbox.bind(this)
  }

  onInputchange(event) {
     this.setState({
       [event.target.name]: event.target.value
     });
   }


   onInputchangeBod =(event)=> {
      this.setState({ communityBody: event });
    }


    checkbox =(event)=>{
      this.setState({ featured: event.target.checked })
    }



  renderQuill = ({ input })=> {
      return (
        <ReactQuill
          {...input}

          style={{backgroundColor: '#fff' , display: "block" , width: "100%" , marginBottom: "20px" }}
          placeholder='Body'
          value={this.state.communityBody}
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




const showTags = () =>{
  if(this.props.tags !== null){
    return this.props.tags.map(( tag)=>{
      return <span className="btn btn-link disabled"> {tag} </span>
    } )
  }
}






const verifyTags=(tags)=>{
    if(typeof tags === 'string'){
        tags= tags.split(/[ ,]+/)
        this.setState({tags})
    }
    // else{ return tags }
  }


  const capitalizeFirstLetter =(text)=> {
      text = text.toLowerCase().split(',') .map((s) => s.charAt(0).toUpperCase() + s.substring(1)) .join(' ');
    return text
  }

const validation =(missing)=>{
  let formatted = []
  // console.log(formatted)

    missing.forEach((item, i) => {
      if(item === 'communitybody'){
        item = 'community'
      }
      formatted.push( ' '+ capitalizeFirstLetter(item) )
    });


  swal({
    title: "Missing Data",
    icon: "error",
    text:  `Missing Fields : ${ formatted }`
  });

}



const verifyTitle= (title)=>{
   title = title.trim().replaceAll(' ' , '-')
   this.setState({title})
}

const onSubmitForm= async()=>{


  let missing =[]

  for (const property in this.state) {
    // console.log( property,  this.state[property].length)
      if(this.state[property].length === 0){
        if(property === 'communityBody'){ missing.push('body') }
        else{ missing.push(property) }
      }
    }

      if(missing.length>0){
        return validation(missing)
      }


      await verifyTags(this.state.tags)
      await verifyTitle(this.state.title)

      this.props.showPreview(this.state)//this is a callback from parent (community.js)

      this.props.previewBlog(this.state) //this is where the data is actually being stored


}






    return(



      <div className="container">



      <h1 className="text-center" style={{paddingTop: '25px', marginBottom: "20px"}}> Tell Us About Your Trip! </h1>

      <div>
          <input className="form-control" style={{height: '55px' , marginBottom: "20px", backgroundColor: '#f0c2c7'}} required name="secret" type="text"  placeholder="PLEASE REMEMBER THIS SECRET KEY!" value={this.state.secret} onChange={this.onInputchange} />
      </div>


      <div>
          <input className="form-control" style={{height: '55px' , marginBottom: "20px"}}  name="title" type="text"  placeholder="Enter a title" value={this.state.title} onChange={this.onInputchange} required />
      </div>

      <div>
          <input className="form-control" style={{height: '55px' , marginBottom: "20px"}}  name="author" type="text"  placeholder="Author's Name" value={this.state.author} onChange={this.onInputchange} required />
      </div>


          <Field
          name="communityBody"
          key="communityBody"
          theme={"bubble"}
          onChange={this.onInputchangeBod}
          component={this.renderQuill} />


      <div>
          <input className="form-control" style={{height: '55px' , marginBottom: "20px"}} required name="image" type="text" placeholder="Enter an image url" value={this.state.image} onChange={this.onInputchange}  />
      </div>


      <div>
          <input className="form-control" style={{height: '55px' , marginBottom: "20px"}} required name="summary" type="text"  placeholder="Enter a quick summary " value={this.state.summary} onChange={this.onInputchange} />
      </div>


      <div>
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
      </div>


      <div className="form-control" style={{ marginBottom: "20px" , float: 'left', height: '55px' ,  paddingTop: '16.5px' }}>
          <label> Do you want this blog to be featured in the main blog page? </label>
          <input style={{verticalAlign: 'middle', marginLeft: '10px'}}name="featured" type="checkbox"  value ={this.state.features} onChange={ this.checkbox} />
      </div>


      <div>
          <input className="form-control" style={{height: '55px' , marginBottom: "20px"}} required name="tags" type="text" value={this.state.tags} placeholder='tags - use space or commas to seperate tags' onChange={this.onInputchange} />

        { /*  <p> Tags that are already used in different blogs, please feel free to use different ones of one of these so your blog can show up under related articles </p> */ }

          {showTags()}

      </div>











      <div className="row">
          <div className="col-12 col-md-8">
            <button className="btn btn-outline-secondary btn-lg btn-block" type="submit"  onClick={onSubmitForm}  > Preview </button>
            <br/>
          </div>

          <div className="col-12 col-md-4" >
              <button class="btn btn-outline-danger btn-lg btn-block" type="submit"  onClick={this.props.onCancel} > Cancel </button>
          </div>
      </div>




    </div>

    )


  }
}

const mapStateToProps = (state)=>{
  return {tags: state.tags , preview: state.previewComm}
}


export default reduxForm({
  form: 'communityForm',
})(connect(mapStateToProps, { previewBlog})(withRouter(CommunityForm)))
