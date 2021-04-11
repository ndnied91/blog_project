

const INITIAL_STATE={
  title:'',
  author:'',
  body: '',
  image: '',
  summary: '',
  secret:'',
  state: '',
  tags: '',
  featured: false,
  instagram: '',
  lat: '',
  lng: '',
  zoom: 9
}




export default function(state= INITIAL_STATE  , action){
  switch(action.type){
    case 'PREVIEW':
      return action.payload

    default:
      return state
  }
}
