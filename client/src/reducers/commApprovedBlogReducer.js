


export default function(state=[] , action){
  switch(action.type){
    case 'COMMUNITY_BLOGS':
      return action.payload
    default:
      return state
  }
}
