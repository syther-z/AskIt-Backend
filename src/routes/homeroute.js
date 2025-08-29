import express from 'express';


const homeRoute = (req, res) => {
    return res.json(req.clientDetails);
}

export default homeRoute;