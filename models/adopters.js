const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Adopters = new Schema({
  email: {type: String, required: true},
  phone: {type: String},
  googleID: {type: String},
  facebookID: {type: String},
  role: {type: String},
  provider: {type: String},
  username:{type:String}


})






module.exports = mongoose.model('Adopters', Adopters)
