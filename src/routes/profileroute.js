import { getFollow } from "../../db/handler/follow.js";
import { getProfile, toggleFollow } from "../../db/handler/userinteraction.js";
import { HttpStatus } from "../errors/response.js";
import { INTERNAL_ERROR_OBJ } from "../utils/commonutils.js";

export const profileRoute = async (req, res) => {
    const email = req.params.pid;
    // console.log(email)
    const dbRes = await getProfile(email);
    return res.status(dbRes.status).json(dbRes);
}

export const followProfile = async (req, res) => {
    // console.log(req.user, ' ', req.params.pid);
    const dbRes = await toggleFollow(req.user.email, req.params.pid);
    return res.json({
        message: dbRes
    });
}


export const getUserFollow = async (req, res) => {
    const dbRes = await getFollow(req.user.email);
    if(!dbRes) return res.status(HttpStatus.INTERNAL_ERROR).json(INTERNAL_ERROR_OBJ);
    return dbRes.status(HttpStatus.OK).json(dbRes);
}