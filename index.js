

const mongoose = require("mongoose");
const express = require("express");
// const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");

const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();

// var User = require('./models/User.js')

const path = require('path');

const keys = require('./config/keys')
mongoose.connect(keys.mongoURI)


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: keys.secretKey,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("lilbecks"));
app.use(passport.initialize());
app.use(passport.session());

require("./services/passportConfig")(passport);


//all auth routes
require("./routes/authRoutes.js")(app);


require("./routes/blogRoutes.js")(app);
require("./routes/communityBlogsRoutes.js")(app);

require("./routes/miscRoutes.js")(app);





      // this makes sure express behaves correctly
      if (process.env.NODE_ENV === 'production') {
        // Express will serve up production assets
        // like our main.js file, or main.css file!
        app.use(express.static('client/build'));

        // Express will serve up the index.html file
        // if it doesn't recognize the route
         //express will serve up the index.html if it doesnt recognize the route



        app.get('*', (req, res) => {
          res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
      }



const PORT = process.env.PORT || 5000
app.listen(PORT , ()=> console.log('starting server'))
