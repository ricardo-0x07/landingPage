const Adopters = require('../models/adopters')

import express from 'express';
import config from '../config/environment';


// Passport configuration
require('./facebook/passport').setup(Adopters, config);

const router = express.Router();

router.use('/facebook', require('./facebook').default);

export default router;
