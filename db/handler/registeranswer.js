import { answerObj, questionObj } from "../../index.js"

export const registerAnswer = async (user, answer, qid) => {
    try {
        const answerTemp = new answerObj({
            qid,
            content: answer.content,
            author: user.email,
            authorname: user.username
        });
        const savedAnswer = await answerTemp.save();
        await questionObj.findOneAndUpdate(
            {qid},
            { $addToSet: { answers: savedAnswer._id } }
        );
        return true;
    } catch (e) {
        console.log(e);
    }
    return false;
}


export const getAnswersOfQuestion = async (qid) => {
    try {
        const answers = await questionObj.findOne({ qid }).populate('answers');
        return answers ?? [];
    } catch (e) {
        console.log(e);
    }
    return [];
}