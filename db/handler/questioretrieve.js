import { questionObj } from "../../index.js";
import { HttpStatus } from "../../src/errors/response.js";
import { INTERNAL_ERROR_OBJ } from "../../src/utils/commonutils.js";

export const getUserQuestions = async (data) => {
    try {
        const questions = await questionObj.find({author: data.email});
        // console.log(questions);
        return {
            status: HttpStatus.OK,
            questions
        }
    } catch (e) {
        console.log(e);
    }
    return INTERNAL_ERROR_OBJ;
}

export const getQuestion = async (data) => {
    try {
        const question = await questionObj.findOne({qid: data}) ?? null;
        // console.log(question);
        return {
            status: HttpStatus.OK,
            question
        }
    } catch (e) {
        console.log(e);
    }
    return INTERNAL_ERROR_OBJ;
}

