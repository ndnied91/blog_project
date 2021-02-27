const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const moment = require('moment-timezone');

const _ = require('lodash')

const Blog = require('../models/Blog.js')
const Tags = require('../models/Tags.js')
const CommunityBlog = require('../models/CommunityBlogs.js')
const ReviewedCommBlogs = require('../models/ReviewedCommunityBlogs.js')


let id = '60203af896cca33740f1bb11'


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





//ADDS A BLOG TO THE DATABASE
    app.post('/api/blogs', async(req,res)=>{

            const {title,body, image , summary , state , tags , author } = req.body
            console.log(tags)
            console.log(typeof tags)

            const newBlog = new Blog({

              title,
              body ,
              created : `${getMonth(month)} ${dayFormatting(date)} ${year}` ,
              image ,
              summary ,
              state,
              tags,
              timestamp : moment.tz(Date.now(), "America/New_York").format(),
              author
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



    //GETS THE SPECIFIC BLOG, EDITS AND RETURNS THE UPDATED BLOG
       app.post('/api/blogs/edit/:id' , async (req, res) => {

         const {title,body, image, summary , state, tags} = req.body

         console.log(tags)
         console.log(typeof tags)
         //
         console.log([...tags])


         const query = { _id: req.params.id  };
         const update = { "$set": { "title": title,
                          "body": body ,
                           "image":image  ,
                           "summary": summary , "state" : state,
                            "tags" : tags
                            }

                         };
         const options = { returnNewDocument: true };

         let blog = await Blog.findOneAndUpdate( query , update , options);



    //FOR TAGS
         Tags.findById(id, await function (err, docs) {
            if (err){
                console.log(err);
            }
              else{
                // console.log([tags])
                // let arr = [tags]
                  // console.log('tags going to tags' , tags)
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


         res.send(blog)
        });






//GETS ALL THE CURRENT BLOGS IN THE DATABASE
  app.get(`/api/blogs` , async (req,res)=>{

    let skip = parseInt(req.query.skip)
    let limit = parseInt(req.query.limit)

    const blogs = await Blog.find().sort({timestamp: 'descending'}).skip(skip).limit(  limit )
    res.send(blogs)
  })



  //ALL THIS IS USED FOR IS THE TOTAL BLOG COUNT FOR PAGINATION
    app.get(`/api/blog_count` , async (req,res)=>{
      const count = await Blog.countDocuments();
      res.send({count})
    })






//this will only be for the destinations page so we can get accept to all blogs
  app.get(`/api/blogs/all` , async (req,res)=>{
    const blogs = await Blog.find()
    res.send(blogs)
  })


  //THIS ROUTE IS FOR ETTING THE MOST VIEWED BLOGS
  app.get(`/api/blogs/favorites` , async (req,res)=>{
    const blogs = await Blog.find().sort({hitCount: 'descending'}).limit(5)
    // console.log(blogs)
    res.send(blogs)
  })







 app.get('/api/destinations/:state' , async (req, res) => {
   const blog = await Blog.find( { state: req.params.state } )
   res.send(blog)
  });






//THIS IS FOR GETTING THE BLOGS PER TITLE SO WHEN YOU REFRESH BLOGS ARE STILL THERE
  app.get('/api/blogs/:title' , async (req, res) => {

    const filter = {  title: req.params.title  };
    const update = {  $inc: { hitCount: 1 }  };
    const blog = await Blog.findOneAndUpdate(filter ,update )
    //HIT COUNT INCREMETATION 

    res.send(blog)
   });





//DELETES A SPECIFIC ROUTE, THEN RETURNS THE OTHER BLOGS
  app.get('/api/blogs/delete/:id' , async (req, res) => {
    await Blog.deleteOne({ _id: req.params.id})
    const blogs = await Blog.find()
    res.send(blogs)
   });






//THIS WILL BE FOR THE GETTING RELATED BLOGS
  app.get('/api/blogs/:title/tags' , async (req, res) => {

    //pass in the blog , and filter based on tags
     const blog = await Blog.find({title: req.params.title})
     const tags = blog[0].tags

        Blog.find(
           { "tags" : {$in: tags } },
           function(err, result) {
             if (err) {
                 res.send(err);
                 // console.log(err)
             } else {

               // console.log(result)
               res.send(result)

             }
           }
      );
 });





  app.get('/api/tags' , async (req, res) => {
    //this will get all the tags that are curently in the database
    const tags = await Tags.find()
    res.send(tags[0].tags)
  })





}
