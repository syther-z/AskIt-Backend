import express from 'express';
import { registerQuestion } from '../../db/handler/registerquestion.js';
import { HttpStatus } from '../errors/response.js';
import { INTERNAL_ERROR_OBJ } from '../utils/commonutils.js';
import { getUserQuestions } from '../../db/handler/questioretrieve.js';


//@ts-check
/** @param {import("express").Request} req * @param {import("express").Response} res */
const questionRoute = (req, res) => {
    
}
/** @param {import("express").Request} req * @param {import("express").Response} res */
export const postQuestionRoute = async (req, res) => {
    const dbRes = await registerQuestion(req.body);
    if(dbRes == HttpStatus.INTERNAL_ERROR) return res.status(dbRes).json(INTERNAL_ERROR_OBJ);
    return res.status(dbRes).json({
        status: dbRes,
        message: 'Question Posted Successfully'
    });
}


export const getQuestionRoute = async (req, res) => {
    const dbRes = await getUserQuestions(req.body);
    if(dbRes.status == HttpStatus.INTERNAL_ERROR) return res.status(HttpStatus.INTERNAL_ERROR).json(INTERNAL_ERROR_OBJ);
    return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        questions: dbRes.questions
    });
}