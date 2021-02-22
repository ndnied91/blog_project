
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const moment = require('moment-timezone');

const _ = require('lodash')

const Blog = require('../models/Blog.js')
const Tags = require('../models/Tags.js')
const CommunityBlog = require('../models/CommunityBlogs.js')
const ReviewedCommBlogs = require('../models/ReviewedCommunityBlogs.js')


let id = '60203af896cca33740f1bb11'

// const filters = require("./filters.js");


module.exports = (app)=>{


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






  // this is for when user wants to delete their own blog, keys have to match
   app.post(`/api/blogs/community/user/:id` , async (req,res)=>{
     // console.log(req.body)
     const {blog_id, key} = req.body

      const blog = await ReviewedCommBlogs.findById(blog_id)

      if(blog.secret === key){
            await ReviewedCommBlogs.findByIdAndRemove(blog_id , function (err) {
              if(err) console.log(err);
                 res.send( {success: 'blog deleted'})
               });
      }
      else{
          res.send( {error: 'incorrect key'})
      }

   })













// THIS WILL BE FOR GETTING BLOGS THAT NEED TO BE REVIEWED
 app.delete(`/api/blogs/community/:title` , async (req,res)=>{
   console.log(req.params.title)

   await CommunityBlog.findOneAndDelete({title: req.params.title }, function (err) {
     if(err) console.log(err);
      console.log("Successful deletion");
      });

   res.send(200)
 })




  // THIS WILL BE FOR GETTING BLOGS THAT NEED TO BE REVIEWED
   app.get(`/api/blogs/community/prereview` , async (req,res)=>{
     const blogs = await CommunityBlog.find()
     console.log(blogs)
     res.send(blogs)
   })


   // THIS WILL BE FOR GETTING BLOGS THAT ARE ALREADY APPROVED
    app.get(`/api/blogs/community/approved` , async (req,res)=>{
      const blogs = await ReviewedCommBlogs.find()
      res.send(blogs)
    })


    //THIS IS FOR THE INDIVIDUAL BLOG VIEW
    app.get('/api/blogs/community/:title' , async (req, res) => {
      const blog = await CommunityBlog.find( { title: req.params.title } )
      console.log(blog)
      res.send(blog)
     });



     //THIS IS FOR GETTING THE INDIVIDUAL BLOG IN COMMUNITY PAEE
      app.get(`/api/blogs/community/approved/:title` , async (req,res)=>{
        console.log(req.params)
        const blog = await ReviewedCommBlogs.find({title: req.params.title})
        res.send(blog)
      })






     // REVIEWED AND APPROVED BLOGS
          app.post('/api/blogs/community/review', async(req,res)=>{

                  const {title, author, communityBody, image , summary , state , tags , secret , featured} = req.body
                  console.log(tags)
                  console.log(typeof tags)

                  const newBlog = new ReviewedCommBlogs({

                    title,
                    author,
                    communityBody ,
                    created : `${getMonth(month)} ${dayFormatting(date)} ${year}` ,
                    image ,
                    summary ,
                    state,
                    tags,
                    timestamp : moment.tz(Date.now(), "America/New_York").format(),
                    secret,
                    featured
                  })


                   Tags.findById(id, function (err, docs) {
                      if (err){
                          console.log(err);
                      }
                        else{
                            tags.forEach((item, i) => {
                                 console.log(item)

                                    if(!docs.tags.includes(item)){
                                      //THIS IS NOT IN THE LIST ALREADY
                                      // console.log('item being added',  item)

                                      Tags.findByIdAndUpdate(id,
                                          { "$push": { "tags": item } },
                                          { "new": true, "upsert": true  , "unique" : true},
                                          function (err, managerparent) {
                                              if (err) throw err;
                                              // console.log(managerparent);
                                          }
                                      ); //end of tag statement

                                    }
                              }); //end of for each statement
                        }
                  });


                  try{
                    await newBlog.save()
                    res.sendStatus(200)

                } catch(err){
                    res.sendStatus(422).send(err)
                }
          })





             //this is for CommunityBlogs NOT REVIEWED YET
              app.post('/api/blogs/community', async(req,res)=>{

                      const {title, author, communityBody, image , summary , state , tags , secret, featured} = req.body
                      console.log(tags)
                      console.log(typeof tags)

                      const newBlog = new CommunityBlog({

                        title,
                        author,
                        communityBody ,
                        created : `${getMonth(month)} ${dayFormatting(date)} ${year}` ,
                        image ,
                        summary ,
                        state,
                        tags,
                        timestamp : moment.tz(Date.now(), "America/New_York").format(),
                        secret,
                        featured
                      })


                       Tags.findById(id, function (err, docs) {
                          if (err){
                              console.log(err);
                          }
                            else{
                                tags.forEach((item, i) => {

                                        if(!docs.tags.includes(item)){
                                          //THIS IS NOT IN THE LIST ALREADY
                                          // console.log('item being added',  item)

                                          Tags.findByIdAndUpdate(id,
                                              { "$push": { "tags": item } },
                                              { "new": true, "upsert": true  , "unique" : true},
                                              function (err, managerparent) {
                                                  if (err) throw err;
                                                  // console.log(managerparent);
                                              }
                                          ); //end of tag statement

                                        }
                                  }); //end of for each statement
                            }
                      });


                      try{
                        await newBlog.save()
                        res.sendStatus(200)

                    } catch(err){
                        res.sendStatus(422).send(err)
                    }
              })













}// end of module.exports
