const express = require('express');
const user = require('../models/user');
const bcrypt = require('bcrypt');
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
            return res.status(200).json({message: "User Logged In Successfully"})
        }
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
})


module.exports = authRouter;