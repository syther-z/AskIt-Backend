import express from 'express';
import { registerQuestion } from '../../db/handler/registerquestion.js';
import { HttpStatus } from '../errors/response.js';
import { INTERNAL_ERROR_OBJ } from '../utils/commonutils.js';
import { getQuestion, getUserQuestions } from '../../db/handler/questioretrieve.js';
import { getUserAnswers, toggleUpvote } from '../../db/handler/userinteraction.js';
import { getAnswersOfQuestion, registerAnswer } from '../../db/handler/registeranswer.js';


//@ts-check
/** @param {import("express").Request} req * @param {import("express").Response} res */
const questionRoute = (req, res) => {
    
}
/** @param {import("express").Request} req * @param {import("express").Response} res */
export const postQuestionRoute = async (req, res) => {
    const dbRes = await registerQuestion(req.body, req.user);
    if(dbRes == HttpStatus.INTERNAL_ERROR) return res.status(dbRes).json(INTERNAL_ERROR_OBJ);
    return res.status(dbRes).json({
        status: dbRes,
        message: 'Question Posted Successfully'
    });
}


export const getQuestionsRoute = async (req, res) => {
    // console.log(req.user);
    const dbRes = await getUserQuestions(req.user);
    if(dbRes.status == HttpStatus.INTERNAL_ERROR) return res.status(HttpStatus.INTERNAL_ERROR).json(INTERNAL_ERROR_OBJ);
    return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        questions: dbRes.questions
    });
}



export const getQuestionRoute = async (req, res) => {
    const qid = req.params.qid ?? '';
    const dbRes = await getQuestion(qid);
    if(dbRes.status == HttpStatus.INTERNAL_ERROR){
        return res.status(HttpStatus.INTERNAL_ERROR).json(INTERNAL_ERROR_OBJ);
    }
    return res.status(dbRes.status).json({
        status: dbRes.question == null ? HttpStatus.NOT_FOUND : HttpStatus.OK,
        question: dbRes.question
    });
}


export const upvoteQuestion = (req, res) => {
    // console.log(req.user);
    // console.log(req.params.qid);
    toggleUpvote(req.params.qid, req.user.email);
    return res.json({
        message: 'hello',
        qid: req.params.qid,
    });
}



export const postAnswer = async (req, res) => {
    try {
        const answer = {
            content: req.body.content,
        }
        const dbRes = await registerAnswer(req.user, answer, req.params.qid);
        return res.status(dbRes ? HttpStatus.CREATED : HttpStatus.INTERNAL_ERROR).json({
            status: HttpStatus.CREATED,
            message: 'Answer Posted Successfully'
        });
    } catch (e) {
        console.log(e);
    }
    return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: 'Something Went Wrong'
    });
}

export const getAnswersFromQuestion = async (req, res) => {
    const dbRes = await getAnswersOfQuestion(req.params.qid);
    return res.status(200).json({
        answers: dbRes
    })
}


export const getAnswersOfUser = async (req, res) => {
    const dbRes = await getUserAnswers(req.params.pid);
    console.log(dbRes);
    return res.status(200).json({
        answers: dbRes
    });
}