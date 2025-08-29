import jwt from 'jsonwebtoken';
import { JWT_KEY, SESSION_DURATION } from '../../serverConstants.js';


export const createToken = (data, duration = SESSION_DURATION) => {
    return jwt.sign(data, JWT_KEY, {
        expiresIn: duration
    });
}

export const validateToken = (token) => {
    return jwt.verify(token, JWT_KEY, (err, decodeData) => {
        if(err){
            return null;
        }
        return decodeData;
    });
}

