import express from 'express';
import { validateToken } from '../utils/tokenhandling.js';
import { HttpStatus } from '../errors/response.js';

export const isAuthenticated = (req, res, next) => {
    const sessionId = req.headers.sessionid ?? '';
    const validate = validateToken(sessionId);
    if (!validate) {
        req.clientDetails = {
            status: HttpStatus.NOT_FOUND,
            user: guestCredientails()
        };
    } else req.clientDetails = {
        status: HttpStatus.OK,
        user: {
            username: validate.username,
            email: validate.email
        }
    }
    // console.log(validate, ' ');
    next();
}

export const isAuthenticatedStrict = (req, res, next) => {
    const sessionId = req.headers.sessionid;
    const validate = validateToken(sessionId);
    if (!validate){
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            message: 'You are not Signed In'
        })
    }
    req.user = validate;
    next();
}

const guestCredientails = () => {
    return {
        username: 'Guest',
        email: 'Login'
    }
}