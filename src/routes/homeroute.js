import express from 'express';


const homeRoute = async (req, res) => {
    console.log('testing');
    setTimeout(()=>{
        return res.json(req.clientDetails)
    }, 200);
}

export default homeRoute;