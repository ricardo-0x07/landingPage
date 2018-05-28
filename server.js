
var path = require('path')
var fs = require('fs');
const express = require('express');
var https = require('https')
var http = require('http');


const routes = require('./routes');
var bodyParser = require('body-parser');
const logger = require('morgan');
const config = require('./config/environment')
const passportSetup = require('./config/passport.config.js');
const passport = require('passport');
import middlewares from './config/middlewares';

const Adopters = require('./models/adopters')
// var cookieParser = require('cookie-parser');


// Mongoose Conf !

require('./config/mongoose.config.js')(config);



var server = {};

// require('./config/passport-setup');
const app = express();
// Passport configuration
require('./auth/facebook/passport').setup(Adopters, config);
app.use(passport.initialize());
app.get('/flogin', passport.authenticate('facebook', { scope : ['email', 'public_profile'] }));
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

app.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: false }))
.use(logger('dev'));


// set up routes
app.use('/',(req,res,next)=>{
     // console.log(res.statusCode)
     res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // res.header('Content-type','application/json')
    next()
})
.use('/', routes)
.use(express.static('public'))


// var certOptions = {
//   key: fs.readFileSync(path.resolve('server.key')),
//   cert: fs.readFileSync(path.resolve('server.crt'))
// }

const certOptions ={
    'key': fs.readFileSync(path.join(__dirname,'./https/key.pem')),
    'cert': fs.readFileSync(path.join(__dirname,'./https/cert.pem'))
}
server.httpsServer = https.createServer(certOptions, app)
server.httpServer = http.createServer(app)

server.init = function(){
    server.httpServer.listen(config.development.port,function(){
        console.log('\x1b[36m%s\x1b[0m','The HTTP server is running on port ', config.development.port);
      });
    
      // Start the HTTPS server
      // server.httpsServer.listen(3005,function(){
        // console.log('\x1b[35m%s\x1b[0m','The HTTPS server is running on port ', 3005);
      // });
}

server.init()