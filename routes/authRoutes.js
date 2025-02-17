
const passport = require('passport')
const passportLocal = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

var User = require('../models/User.js')

const requireLogin = require('../middlewares/requireLogin')



// const cookiesMiddleware = require('universal-cookie-express');

module.exports = (app) => {

// app.use(cookiesMiddleware()))

  //  ======routing ========


  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send(req.user._id);
          console.log(req.user);
        });
      }
    })(req, res, next);
  });



  app.post("/api/user", (req, res) => {

    User.findOne({ username: req.body.username }, async (err, doc) => {
      if (err) throw err;
      if (doc) res.send("User Already Exists");
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
        });
        await newUser.save();
        res.send("User Created");
      }
    });
  });
  app.get("/user", (req, res) => {
    // res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
  });



app.get('/dashboard', requireLogin, (req,res)=>{
  res.sendStatus(200)
})



//this route gets us the ID that is used for the cookie
app.get('/api/current_user/id', requireLogin,  (req,res)=>{
      // console.log('Cookie' , req.cookies.username);
      // console.log('Session' ,req.session.passport.user);
      res.send(req.session.passport.user)
  })

//this route is used for getting the current users name
  app.get('/api/current_user/user', requireLogin,  (req,res)=>{
        res.send(req.user)
        // res.send(req.user.username)
    })




  app.get('/api/logout', (req,res)=>{
      req.logout()
      res.redirect('/')
    })


}
