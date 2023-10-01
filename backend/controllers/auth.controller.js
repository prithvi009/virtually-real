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
        const {password:pass, ...rest} = validUser._doc;
        res.cookie("token",token,{
            httpOnly:true,
        }).status(200).json(rest);

    }
    catch(err){
        next(err);
    }
}

export const googleLogin = async(req,res,next)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        const password = "1234567";
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        if(!user){
            const newUser = new User({
                username:req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email:req.body.email,
                password:hashedPassword,
                avatar:req.body.photo
            });
            const savedUser = await newUser.save();
            const token = jwt.sign({_id:savedUser._id}, process.env.SECRET_KEY, {expiresIn:"1h"});
            const { password: pass, ...rest } = savedUser._doc;
            res.cookie("token",token,{
                httpOnly:true,
            }).status(200).json(rest);
        }
        else{
            const token = jwt.sign({_id:user._id}, process.env.SECRET_KEY, {expiresIn:"1h"});
            const { password: pass, ...rest } = user._doc;
            res.cookie("token",token,{
                httpOnly:true,
            }).status(200).json(rest);
        }

    }
    catch(err){
        next(err);
    }

}