




export default function(state= null , action){
  switch(action.type){
    case 'SET_PERMA':
      return action.payload
    default:
      return state
  }
}
