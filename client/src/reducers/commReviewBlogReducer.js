


export default function(state=[] , action){
  switch(action.type){
    case 'COMMUNITY_BLOGS_REVIEW':
      return action.payload
    default:
      return state
  }
}
