const express = require('express');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validateAuth = require('../middlewares/authValidation');
const authRouter = express.Router();

authRouter.post("/signup",async(req,res) => {
    try {
        const {firstName,lastName,email,password} = req.body;
        //Find the user using emailId
        const existingUser = await user.findOne({email:email});
        if (existingUser) {
            return res.status(400).json({message: "User with Email Id already exists, please choose different one."})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const createUser = new user({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })
        const User = await createUser.save();
        return res.status(200).json({message: "User Successfully Created",User})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server error"})
    }
})

authRouter.post("/login",async(req,res) => {
    try {
        const {email,password} = req.body;
        const existingUser = await user.findOne({email:email});
        if (!existingUser) {
            return res.status(400).json({message: "Email Not found,please Create One"})
        }
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
        if (isPasswordCorrect) {
            const token = await jwt.sign({_id:existingUser}, "Hullur9606@", {
                expiresIn: "1h"
            })
            res.cookie("token",token)
            return res.status(200).json({message: "User Logged In Successfully"})
        }
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
})


authRouter.get("/test",validateAuth,async(req,res) => {
    const loggedInUser = req.user
    
})


module.exports = authRouter;