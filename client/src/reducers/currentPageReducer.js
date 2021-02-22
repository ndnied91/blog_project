




export default function(state= 0 , action){
  switch(action.type){
    case 'CURR_PAGE':
      return action.payload
    default:
      return state
  }
}
