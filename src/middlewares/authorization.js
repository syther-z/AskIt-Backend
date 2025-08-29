import express from 'express';
import { validateToken } from '../utils/tokenhandling.js';
import { HttpStatus } from '../errors/response.js';

const isAuthorized = (req, res, next) => {
    const sessionId = req.headers.sessionid;
    const validate = validateToken(sessionId);
    if(!validate) return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'You are not Authorized for that'
    })
}