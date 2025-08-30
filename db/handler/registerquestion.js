import { questionObj } from "../../index.js"
import { HttpStatus } from "../../src/errors/response.js";

export const registerQuestion = async (data) => {
    try {
        const question = new questionObj({
            question: data.question,
            author: data.user.email,
            description: data.description,
            tags: data.tags
        });
        await question.save();
        return HttpStatus.CREATED;
    } catch (e) {
        console.log(e);
    }
    return HttpStatus.INTERNAL_ERROR;
}