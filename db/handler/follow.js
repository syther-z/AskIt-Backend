import express from 'express';
import { userFollowObj } from '../../index.js';


export const getFollow = async (email) => {
    try {
        const obj = await userFollowObj.findOne({ email });
        if(!obj) obj = {
            email,
            following: [],
            followers: []
        }
        return obj;
    } catch (e) {
        console.log(e);
    }
    return false;
}