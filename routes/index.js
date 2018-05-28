const router = require('express').Router();
const passport = require('passport');
const Adopters = require('../models/adopters');
const { sanitizeBody } = require('express-validator/filter');
const helpers = require('../helpers')



router.get('/', (req, res) => {
    res.render('home');
});


router.get('/adopter',(req,res)=>{
  Adopters.find({},"email phone")
  .exec(function (err, users) {
    if (!err) {
            helpers.ReS(res,users,200)      
    }else{
      helpers.ReE(res,err,500)

    }

  })
})

//this is the register user route
// Required Data: email and phone number
router.post('/register', (req, res) => {
    // res.render('login', { user: req.user });
    sanitizeBody('*').trim().escape();

    console.log(req.body)

    const {email , phone } = req.body;
    // check for valid email and phone number
    const userEmail = typeof(email) == 'string' && email.indexOf('@') > -1 && email.trim().length > 0 ? email.trim(): false;
    const userPhone = typeof(phone) == 'string' && phone.trim().length == 10 ? phone.trim() : false;
    if (userEmail && userPhone) {
    const newAdopter = new Adopters({
      email: userEmail,
      phone:userPhone
    })
    newAdopter.save((err)=>{
      if(!err){
        // helpers.ReS(res,{newAdopter},200)
        res.render('thanks')

      }else{
        TE(err,true)
        helpers.ReE(res,err,500)
      }
    })

    }
    else if (!userEmail) {
      ReE(res,"MISSING OR INCORRECT EMAIL",404)

    }
    else if (!userPhone) {
      ReE(res,"MISSING OR INVALID PHONE NUMBER",404)
    }
    // res.send("The on implemented register route")
});



// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.adopter);
    res.render('thanks');
});




module.exports = router;
