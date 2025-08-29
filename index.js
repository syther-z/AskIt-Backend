import express from 'express'; 
import cors from 'cors';

import { connectToDB, connectToModel } from './db/connection.js';
import { PORT } from './serverConstants.js';
import { userSchema } from './db/model/usermodel.js';
import { questionSchema } from './db/model/questionmodel.js';
import homeRoute from './src/routes/homeroute.js';
import { isAuthenticated } from './src/middlewares/authentication.js';
import handleSignUp from './src/routes/signup.js';
import { validateCredientials } from './src/middlewares/validatecrediential.js';
import handleSignIn from './src/routes/signin.js';


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


app.listen(PORT, () => {
    console.log(`Server is Running at ${PORT}`);
});