const express = require('express');
const routes = require('./routes/routes');
var bodyParser = require('body-parser');
require('./global_functions');  //instantiate global functions
const logger = require('morgan');
const config = require('./config/config.js')
const passportSetup = require('./config/passport.config.js');
const passport = require('passport');

// var cookieParser = require('cookie-parser');


// Mongoose Conf !
require('./config/mongoose.config.js')(config);





// require('./config/passport-setup');
const app = express();

// set view engine
app.set('view engine', 'ejs');

// app.use(passport.initialize())
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));


// set up routes
app.use('/',(req,res,next)=>{
     // console.log(res.statusCode)
     res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // res.header('Content-type','application/json')
    next()
})

// create home route
// app
app.use('/', routes);

app.use(express.static('public'))



app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});
