import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';

import models from '../models'
import config from '../config/environment';

export function verifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        jwt.verify(token, config.secrets.session, (error, data) => {
            if (error) {
                res.status(403).send('Invalid Token');
            } else {
                return next()
            }
        });
    }else {
        res.status(403).send('AuthorizationHeader Missing');
    }
}

export const validateJwt = expressJwt({
    secret: config.secrets.session
});

/* 
    Attaches the user object to the request if authenticated otherwise returns 403
 */
export function isAuthenticated() {
    return compose()
        .use((req, res, next) => {
            if (req.query && req.hasOwnProperty('access_token')) {
                req.headers.authorization = `Bearer ${req.cookies.token}`;
            }
            validateJwt(req, res, next);
        })// Attach user to request
        .use((req, res, next) => {
            models.Adopters.find({
                where: {
                    id: req.user.id
                }
            })
                .then(user => {
                    if (!user) {
                        return res.status(401).end();
                    }
                    req.user = user;
                    next();
                    return user;
                })
                .catch(err => next(err));
        });
}

/* 
    Check if the user role meets the minimum requirements of the route

 */
export function hasRole(roleRequired) {
    if (!roleRequired) {
        throw new Error('Required role needs to be set')
    }

    return compose()
        .use(isAuthenticated())
        .use((req, res, next) => {
            if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
                return next();
            }
            return res.status(403).send('Forbidden')
        })
}

/* 
    Return a jwt token signed by the app secret
 */
export function signToken(id, role) {
    return jwt.sign({ id, role }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
    });
}

/* 
    Set token cookie directly for oAuth strategies
 */
export function setTokenCookie(req, res) {
    if (!req.user) {
        return res.status(404).send('It looks like you aren\'t logged in, please try again.')
    }
    const token = signToken(req.user.id, req.user.role);
    res.cookie('token', token);
    res.redirect('/');
}

export async function requireAuth(user) {
    if (!user || !user.id) {
        throw new Error('Unauthorized');
    }

    try {
        const me = await models.Adopters.find({
            where: {
                id: user.id
            }
        });
        if (!me) {
            throw new Error('Unauthorized');
        }
        return me;
    } catch (error) {
        throw error;
    }
}

export function decodeToken(token) {
    if (token) {
        const arr = token.split(' ');

        if (arr[0] === 'Bearer') {
            try {
                return jwt.verify(arr[1], config.secrets.session);
            } catch (error) {
                console.log('decodeToken error message: ', error.message)
                // throw error
                return null
            }
        }        
    }
    throw new Error('Token invalid!');
}