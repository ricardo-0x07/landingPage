'use strict';

import express from 'express';
import passport from 'passport';
import {setTokenCookie} from '../authService';

var router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    scope: ['email', 'user_about_me'],
    successRedirect : '/profile',
    failureRedirect: '/',
    session: false
  }))
  .get('/callback', passport.authenticate('facebook', {
    successRedirect : '/profile',
    failureRedirect: '/',
    session: false
  }), setTokenCookie);

export default router;
