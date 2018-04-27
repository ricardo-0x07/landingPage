/* eslint-disable no-param-reassign */
import bodyParser from 'body-parser';

import { decodeToken } from '../auth/authService';

function auth(req, res, next) {
    try {
        const token = req.headers.authorization;
        if (token && token !== 'null') {
            console.log('token: ', token);
            console.log('req.body: ', req.body);
            const user = decodeToken(token);
            req.currentUser = user;
        } else {
            req.currentUser = null;
        }
        return next();
    } catch (error) {
        console.log('error.message: ', error.message);
        res.status(403).send('Unauthorized');
        // throw error;
    }
}

export default app => {
    app.use(bodyParser.json()); // add body-parser as the json parser middleware
    app.use(auth);        
}