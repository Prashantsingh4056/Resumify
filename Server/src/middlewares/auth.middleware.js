import express from "express";
import jwt from "jsonwebtoken";
import TokenBlackList from "../models/blacklisttoken.model.js";


const authUser = async (req, res, next) => {

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Token not provided"
        })
    }

    const isTokenBlacklisted = await TokenBlackList.findOne({token});

    if(isTokenBlacklisted){
        return res.status(401).json({
            message: "Token is invalid!"
        })
    }

    try {


        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded

        next();
        
    } catch (error) {
        console.log(error);
        
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
}

export {
    authUser
}