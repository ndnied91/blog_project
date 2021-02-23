

const INITIAL_STATE={
  title:'',
  author:'',
  communityBody: '',
  image: '',
  summary: '',
  secret:'',
  state: '',
  tags: '',
  featured: false
}




export default function(state= INITIAL_STATE  , action){
  switch(action.type){
    case 'COMMUNITY_PREVIEW':
      return action.payload

    default:
      return state
  }
}
