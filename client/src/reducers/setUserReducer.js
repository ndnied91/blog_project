




export default (state = null, action) =>{
    if(action.type === 'SET_USER'){
      return action.payload
    }
      return state;
}
