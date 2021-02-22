
export default function(state=[] , action){
 switch(action.type){
   case 'TAGS':
     return action.payload

   default:
     return state
 }
}
