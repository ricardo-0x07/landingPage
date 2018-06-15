/*eslint no-process-env:0*/

import path from 'path';
import _ from 'lodash';

process.env.NODE_ENV = process.env.NODE_ENV
  ? process.env.NODE_ENV
  : 'development';
  
var all = {
    // Secret for session, you will want to change this and make it an environment
    // variable
    secrets: {
        session: 'save-button-app-secret'
    },
    env: process.env.NODE_ENV, 
    facebook: {
        clientID: process.env.FACEBOOK_ID || '915253811988281',
        clientSecret: process.env.FACEBOOK_SECRET || '8644afdacffed99ced236b3cff458c2b',
        callbackURL: `${process.env.DOMAIN || ''}/auth/facebook/callback`
    },
    google: {
        clientID: "294713666997-tk08j163kg90efnver6l3jl0atddvi95.apps.googleusercontent.com",
        clientSecret: "XJsG3w5u41k5DPTEcaQoc5d3"
    },
    development:{
        port:3000,

    }


}
module.exports = _.merge(all, require(`./${process.env.NODE_ENV}.js`) || {});
