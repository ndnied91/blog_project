
export default (state = [], action) =>{
    if(action.type === 'ERROR_MSG'){
      return action.payload
    }
      return state;
}
