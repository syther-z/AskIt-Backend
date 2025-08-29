import mongoose from "mongoose";


export async function connectToDB(connectionString = '', schema  = '') {
    await mongoose.connect('mongodb://localhost:27017/BlogApp')
    console.log('Connection to DB is Successful');
}

export function connectToModel(modelName, model){
    const obj = mongoose.model(modelName, model);
    return obj;
}


