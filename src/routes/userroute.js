import express from 'express';


const userRoute = async (req, res) => {
    // console.log('testing');
    setTimeout(()=>{
        return res.json(req.clientDetails)
    }, 200);
}

export default userRoute;