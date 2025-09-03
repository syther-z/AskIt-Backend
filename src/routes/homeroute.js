import express from 'express';
import { homeFeed } from '../../db/handler/homefeed.js';
import { HttpStatus } from '../errors/response.js';
import { INTERNAL_ERROR_OBJ } from '../utils/commonutils.js';


const homeRoute = async (req, res) => {
    // console.log('testing');
    // setTimeout(()=>{
    //     return res.json(req.clientDetails)
    // }, 200);
    const dbRes = await homeFeed();
    if(dbRes.status == HttpStatus.INTERNAL_ERROR) return res.status(HttpStatus.INTERNAL_ERROR).json(INTERNAL_ERROR_OBJ);
    return res.status(HttpStatus.OK).json(dbRes);
}

export default homeRoute;