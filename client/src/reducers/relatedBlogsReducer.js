

export default function(state=null , action){
  switch(action.type){
    case 'RELATED_BLOGS':
      return action.payload

    default:
      return state
  }
}
