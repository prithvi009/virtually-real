import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const signup= async(req,res, next)=>{
    const {username,email,password}=req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
        username,
        email,
        password:hashedPassword
    });
    
    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        next(err);
    }


}