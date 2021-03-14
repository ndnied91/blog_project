





if(process.env.NODE_ENV ===  'production'){
  //return the production set of keys
  console.log('GOING TO PRODUCTION')
  module.exports = require('./prod')

}else{
  //we are in the developement - return correct keys
  //this will be local
  module.exports = require('./dev')
}
