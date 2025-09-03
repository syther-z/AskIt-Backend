import express from 'express'; 
import cors from 'cors';

import { connectToDB, connectToModel } from './db/connection.js';
import { PORT } from './serverConstants.js';
import { userSchema } from './db/model/usermodel.js';
import { questionSchema } from './db/model/questionmodel.js';
import homeRoute from './src/routes/homeroute.js';
import { isAuthenticated, isAuthenticatedStrict } from './src/middlewares/authentication.js';
import handleSignUp from './src/routes/signup.js';
import { validateCredientials } from './src/middlewares/validatecrediential.js';
import handleSignIn from './src/routes/signin.js';
import { getAnswersFromQuestion, getAnswersOfUser, getQuestionRoute, getQuestionsRoute, postAnswer, postQuestionRoute, upvoteQuestion } from './src/routes/questionroute.js';
import userRoute from './src/routes/userroute.js';
import { userRespondSchema } from './db/model/userrespondmodel.js';
import { userFollowSchema } from './db/model/userfollow.js';
import { followProfile, getUserFollow, profileRoute } from './src/routes/profileroute.js';
import answerSchema from './db/model/answermodel.js';

const app = express();
export let userObj = null;
export let questionObj = null;
export let userResponseObj = null;
export let answerObj = null;
export let userFollowObj = null;
async function connect(){
    await connectToDB();
    userObj = connectToModel('user', userSchema);
    questionObj = connectToModel('question', questionSchema);
    answerObj = connectToModel('answer', answerSchema);
    userResponseObj = connectToModel('userresponse', userRespondSchema);
    userFollowObj = connectToModel('userfollow', userFollowSchema);
}
connect();
app.use(cors());
app.use(express.json());



app.get('/', isAuthenticated, homeRoute);
app.get('/user', isAuthenticated, userRoute);



app.post('/signup', validateCredientials({signin: undefined}), handleSignUp);
app.post('/signin', validateCredientials({signin: true}), handleSignIn);
app.route('/question')
.all(isAuthenticatedStrict)
.get(getQuestionsRoute)
.post(postQuestionRoute);

app.get('/follow', isAuthenticatedStrict, getUserFollow);

// app.get('/question/:qid', getQuestionRoute);

// app.route('/question/:qid').get(getQuestionRoute);

const router = express.Router({ mergeParams: true });
const profileRouter = express.Router({ mergeParams: true });
router.get('/', getQuestionRoute);
router.patch('/upvote', isAuthenticatedStrict, upvoteQuestion);
router.post('/answer', isAuthenticatedStrict, postAnswer);
router.get('/answer', isAuthenticated, getAnswersFromQuestion);

profileRouter.get('/:pid', profileRoute)
.patch('/:pid/follow', isAuthenticatedStrict, followProfile);

profileRouter.get('/:pid/answers', isAuthenticatedStrict, getAnswersOfUser);


app.use('/question/:qid', router);
app.use('/profile', profileRouter);
app.listen(PORT, () => {
    console.log(`Server is Running at ${PORT}`);
});