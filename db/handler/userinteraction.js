import { answerObj, questionObj, userFollowObj, userObj, userResponseObj } from "../../index.js";
import { HttpStatus } from "../../src/errors/response.js";
import { INTERNAL_ERROR_OBJ } from "../../src/utils/commonutils.js";



export const getProfile = async (email) => {
    try {
        const user = await userObj.findOne({email});
    if(!user) return {
        status: HttpStatus.NOT_FOUND,
        message: 'No Account Found'
    };
    const userfollows = await userFollowObj.findOne({email});
    // console.log(user, " ", userfollows);
    return {
        status: HttpStatus.OK,
        user: {
            email: user.email,
            username: user.username,
            followers: userfollows.followers,
            following: userfollows.following
        }
    }
    } catch (e) {
        console.log(e);
    }
    return INTERNAL_ERROR_OBJ;
}






export const toggleUpvote = async (qid, userEmail) => {
    const question = await questionObj.findOne({ qid });
    const user = await userResponseObj.findOne({ email: userEmail });
    if (!question) return false;

    // console.log(question.upvotes);

    if (question.upvotes.includes(userEmail)) {

        // remove upvote
        await questionObj.findOneAndUpdate(
            { qid },
            { $pull: { upvotes: userEmail } },
            { new: true }
        );

        await userResponseObj.findOneAndUpdate(
            { email: userEmail },
            { $pull: { upvotes: qid } }
        );


    } else {
        // add upvote on question
        await questionObj.findOneAndUpdate(
            { qid },
            { $addToSet: { upvotes: userEmail } },
            { new: true }
        );
        // add upvoted question id to client details
        await userResponseObj.findOneAndUpdate(
            { email: userEmail },
            { $addToSet: { upvotes: qid } }
        );
    }

    return true;
};



export const toggleFollow = async (email, targetEmail) => {
    if(email == targetEmail) return false;
    const targetUser = await userFollowObj.findOne({ email: targetEmail });
    if (!targetUser) return false;
    // console.log(targetUser.followers.includes(email));
    try {
        if (targetUser.followers.includes(email)) {
            await userFollowObj.findOneAndUpdate(
                { email: targetEmail },
                { $pull: { followers: email } }
            );

            await userFollowObj.findOneAndUpdate(
                { email },
                { $pull: { following: targetEmail } }
            );
        } else {
            await userFollowObj.findOneAndUpdate(
                { email: targetEmail },
                { $addToSet: { followers: email } }
            );

            await userFollowObj.findOneAndUpdate(
                { email },
                { $addToSet: { following: targetEmail } }
            );
        }
        return true;
    } catch (e) {
        console.log(e);
    }

    return false;
}



export const getUserAnswers = async (pid) => {
    try {
        const answers = await answerObj.find({ author: pid });
        return answers;
    } catch (e) {
        console.log(e);
    }
    return [];
}

const getUserUpvotes = async (pid) => {
    try {
        const answers = await answerObj.find({ email: pid });
        return answers;
    } catch (e) {
        console.log(e);
    }
    return [];
}