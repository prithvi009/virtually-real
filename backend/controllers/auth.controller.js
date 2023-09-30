import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup= async(req,res, next)=>{
    const {username,email,password}=req.body;
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
        username,
        email,
        password:hashedPassword
    });
    
    try{
        const savedUser = await newUser.save();
        res.status(201).json("User created successfully");
    }catch(err){
        next(err);
    }
}

export const signin = async(req,res,next)=>{
    const {email,password}=req.body;
    try{
        const validUser = await User.findOne({email});
        if(!validUser){
            return res.status(400).json("Wrong credentials");
        }
        const validPassword = await bcrypt.compare(password,validUser.password);
        if(!validPassword){
            return res.status(400).json("Wrong credentials");
        }
        const token = jwt.sign({_id:validUser._id}, process.env.SECRET_KEY, {expiresIn:"1h"});
        res.cookie("token",token,{
            httpOnly:true,
        }).status(200).json({success:true,token});

    }
    catch(err){
        next(err);
    }
}