
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const moment = require('moment-timezone');

const Comment = require('../models/Comment.js')



module.exports = (app) => {


  var d = new Date();

  let month = d.getMonth()+1
  let year = d.getFullYear()
  let date = d.getDate()


  function getMonth(month){
        switch(month){
         case 1: return "January"
         case 2: return "February"
         case 3: return "March"
         case 4: return "April"
         case 5: return "May"
         case 6: return "June"
         case 7: return "June"
         case 8: return "July"
         case 9: return "August"
         case 10: return "September"
         case 11: return "October"
         case 12: return "November"
         case 13: return "December"
         default: return null
        }

  }


  function dayFormatting(day){
    let date = day.toString()
    if( date >= 11 &&  date <= 13 ) return `${date}th`
    if( date.charAt(date.length-1) === 1 ) return `${date}st`
    else if( date.charAt(date.length-1) === 2 ) return `${date}nd`
    else if( date.charAt(date.length-1) === 3 ) return `${date}rd`
    else return `${date}th`
  }




  app.post('/api/feedback' , async (req, res) => {
    const {topic , comment, email } = req.body

    const newComment = new Comment({
      created : `${getMonth(month)} ${dayFormatting(date)} ${year}` ,
      topic,
      comment ,
      email
    })
            try{
              await newComment.save()
              res.sendStatus(200)

          } catch(err){
              res.sendStatus(422).send(err)
          }
   });



app.get('/api/feedback' , async (req,res)=>{
  //gets feedback from database
  const comments = await Comment.find()
  res.send(comments)
})


} //end of module
