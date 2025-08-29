
//@ts-check

import { checkLoginCrediential, doesClientExist } from "../../db/handler/existingcheck.js";
import { SESSION_DURATION } from "../../serverConstants.js";
import { HttpStatus } from "../errors/response.js";
import { INTERNAL_ERROR_OBJ } from "../utils/commonutils.js";
import { createToken } from "../utils/tokenhandling.js";

/** @param {import("express").Request} req * @param {import("express").Response} res */
const handleSignIn = async (req, res) => {
    const body = req.body;
    console.log(body);
        let manRes = {
            status: HttpStatus.NOT_FOUND,
            message: 'User Not Found'
        };
        let dbRes = await checkLoginCrediential({email: body.email, password: body.password});
        console.log(dbRes);
        if(dbRes.status == HttpStatus.INTERNAL_ERROR) {
            manRes = INTERNAL_ERROR_OBJ;
        } else
        if(dbRes.status == HttpStatus.BAD_REQUEST){
            manRes = {
                status: dbRes.status,
                message: 'Invalid Password'
            }
        }
        if(dbRes.status == HttpStatus.OK){
            const token = createToken({
                username: dbRes.user.username,
                email: dbRes.user.email
            });
            manRes = {
                status: HttpStatus.OK,
                message: 'Login Successfull',
                token
            };
        }
        return res.status(dbRes.status).json(manRes);
}


export default handleSignIn;