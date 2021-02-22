
import Cookies from 'js-cookie'



const INITIAL_STATE = {
  user : Cookies.get('username') || null
}


// console.log( INITIAL_STATE.user )

export default function(state= INITIAL_STATE.user , action){
  switch(action.type){
    case 'FETCH_USER':
      return action.payload
    default:
      return state
  }
}
