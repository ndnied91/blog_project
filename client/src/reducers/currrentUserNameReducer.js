


export default function(state=null , action){
  switch(action.type){
    case 'FETCH_USERNAME':
    if(action.payload === undefined){
      return null
    }
      return action.payload
      
    default:
      return state
  }
}
