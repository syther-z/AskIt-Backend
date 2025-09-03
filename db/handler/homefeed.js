import { questionObj } from "../../index.js"
import { HttpStatus } from "../../src/errors/response.js";

export const homeFeed = async () => {
    try {
        const questions = await questionObj.find({});
        return {
            status: HttpStatus.OK,
            questions
        }
    } catch (e) {
        console.log(e);
    }
    return {
        status: HttpStatus.INTERNAL_ERROR
    }
}