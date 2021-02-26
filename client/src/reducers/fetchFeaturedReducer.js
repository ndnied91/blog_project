

export default function(state=[] , action){
  switch(action.type){
    case 'FETCH_FEATURED':
      return action.payload

    default:
      return state
  }
}
