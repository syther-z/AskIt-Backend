import bcrypt from 'bcrypt';
import { ENC_LAYER } from '../../serverConstants.js';

export const getEncryptedPass = async (password) => {
    const encPassword = await bcrypt.hash(password, ENC_LAYER);
    return encPassword;
};

export const validatePass = async (clientPass, dbPass) => {
    return await bcrypt.compare(clientPass, dbPass);
};