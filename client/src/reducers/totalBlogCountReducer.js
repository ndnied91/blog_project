

export default function(state=null , action){
  switch(action.type){
    case 'BLOG_COUNT':
      return action.payload

    default:
      return state
  }
}
