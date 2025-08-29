  
//@ts-check

import { registerClient } from "../../db/handler/registeruser.js";
import { SESSION_DURATION } from "../../serverConstants.js";
import { HttpStatus } from "../errors/response.js";
import { createToken } from "../utils/tokenhandling.js";

/** @param {import("express").Request} req * @param {import("express").Response} res */
const handleSignUp = async (req, res) => {
    const body = req.body;
    let dbRes = await registerClient(body);
    if(dbRes.status == HttpStatus.CREATED){
        const token = createToken(dbRes.user, SESSION_DURATION);
        dbRes = {...dbRes, token};
    }
    return res.status(dbRes.status).json(dbRes);
}


export default handleSignUp;