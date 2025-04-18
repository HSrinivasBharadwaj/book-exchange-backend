const express = require("express");
const validateAuth = require("../middlewares/authValidation");
const profileRouter = express.Router();
const bcrypt = require('bcrypt');

profileRouter.get("/profile/view", validateAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    return res
      .status(200)
      .json({ message: "Profile Fetched Successfully", data: loggedInUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while fetching the profile", error: error.message });
  }
});

profileRouter.put("/profile/edit", validateAuth, async(req,res) => {
    const {firstName,lastName} = req.body;
    try {
        const loggedInUser = req.user;
        if (firstName) {
            loggedInUser.firstName = firstName
        }
        if(lastName) {
            loggedInUser.lastName = lastName
        }
        await loggedInUser.save();
        return res.status(201).json({message: "Profile Updated Succssfully",data:loggedInUser})
    } catch (error) {
        console.log(error)
    }
})


profileRouter.post("/reset-password",validateAuth,async(req,res) => {
    try {
        const {newPassword} = req.body;
        const loggedInUser = req.user;
        const hashedPassword = await bcrypt.hash(newPassword,10);
        loggedInUser.password = hashedPassword;
        await loggedInUser.save();
        return res.status(201).json({message: "Password Updated Successfully"})
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error",error:error });
    }
})


module.exports = profileRouter;
