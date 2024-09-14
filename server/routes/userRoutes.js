import express from "express";
import * as dotenv from "dotenv";
import User from "../mongodb/models/user.js"
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"

dotenv.config()

const router =  express.Router();

router.route("/").post(async (req,res) => {
    try {
        const {name, password, email, isUser} = req.body
        console.log(isUser)
        if(!isUser){
            let user = await User.findOne({email})
            if(user){
                console.log("User already exist")
                return res.status(400).json({message:"User already exists"})
            }
            
            const hashPassword = await bcrypt.hash(password,10)

            user = await User.create({email:email, password:hashPassword, name:name})
            const token = jwt.sign({email: user.email, id: user._id}, "key", {expiresIn: "1h"})
            console.log("sign in",token)
            return res.status(200).json({user,token})
        }
        
        const user = await User.findOne({email})
        console.log("wtf")
        if(!user){
            console.log("User doesn't exist")
            return res.status(404).json({message:"User doesn't exist"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        console.log(user.password)
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid password"})

        const token = jwt.sign({email:user.email, id: user._id, name: user.name, created_at: Date.now()}, "key", {expiresIn:"1h"})
        console.log("sign in",token)
        return res.status(200).json({user,token})
    } catch (error) {
        res.status(500).json({message:"Error"})
        console.log(error,"byeee")
    }
})

export default router
