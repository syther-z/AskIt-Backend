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
import { getQuestionRoute, postQuestionRoute } from './src/routes/questionroute.js';


const app = express();
export let userObj = null;
export let questionObj = null;
async function connect(){
    await connectToDB();
    userObj = connectToModel('user', userSchema);
    questionObj = connectToModel('question', questionSchema);
}
connect();
app.use(cors());
app.use(express.json());



app.get('/', isAuthenticated, homeRoute);
app.post('/signup', validateCredientials({signin: undefined}), handleSignUp);
app.post('/signin', validateCredientials({signin: true}), handleSignIn);
app.route('/question')
.all(isAuthenticatedStrict)
.get(getQuestionRoute)
.post(postQuestionRoute);


app.get('/testing', async (req, res) => {
   setTimeout(()=>{
    res.end('done');
   },1000);
})

app.listen(PORT, () => {
    console.log(`Server is Running at ${PORT}`);
});