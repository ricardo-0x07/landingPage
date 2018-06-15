
var path = require('path')
var fs = require('fs');
const express = require('express');
var https = require('https')

var certOptions = {
  key: fs.readFileSync(path.resolve('server.key')),
  cert: fs.readFileSync(path.resolve('server.crt'))
}
const routes = require('./routes/routes');
var bodyParser = require('body-parser');
require('./global_functions');  //instantiate global functions
const logger = require('morgan');
const config = require('./config/environment')
const passportSetup = require('./config/passport.config.js');
const passport = require('passport');
import middlewares from './config/middlewares';
const Adopters = require('./models/adopters')
// var cookieParser = require('cookie-parser');


// Mongoose Conf !
require('./config/mongoose.config.js')(config);





// require('./config/passport-setup');
const app = express();
// Passport configuration
require('./auth/facebook/passport').setup(Adopters, config);
app.use(passport.initialize());
app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email', 'public_profile'] }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { session: false }),
    (req, res) => {
    // Successful authentication, redirect home.
    console.log('Authenticated');
    res.send("Authenticated");
});

middlewares(app)

// set view engine
app.set('view engine', 'ejs');

// app.use(passport.initialize())
// app.use(passport.initialize());
// app.use(passport.session());

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



// app.listen(3005, () => {
//     console.log('app now listening for requests on port 3005');
// });

var server = https.createServer(certOptions, app).listen(3005, () => {
    console.log('app now listening for requests on port 3005');
});