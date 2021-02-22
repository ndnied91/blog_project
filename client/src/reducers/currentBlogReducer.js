


export default function(state=null , action){
  switch(action.type){
    case 'CURRENT_BLOG':
      return action.payload

    default:
      return state
  }
}
