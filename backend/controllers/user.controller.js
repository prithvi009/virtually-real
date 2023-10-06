import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import Listing from '../models/listing.model.js';

export const updateUser = async(req,res,next)=>{
    const id = req.params.id;
    console.log(req);
    if(req.user._id !== req.params.id)
    {
        return res.status(403).json("You can update only your account");
    }
    try{
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar,
            },
        },{new:true});
        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    }
    catch(err){
        next(err);
    }

}


export const deleteUser = async(req,res,next)=>{
    const id = req.params.id;
    if(req.user._id !== req.params.id)
    {
        return res.status(403).json("You can delete only your account");
    }
    try{
        await User.findByIdAndDelete(id);
        res.status(200).json("User has been deleted");
    }
    catch(err){
        next(err);
    }
}

export const getUserListings = async(req,res,next)=>{
    try{
        console.log(req.params.id)
        const listings = await Listing.find({userRef:req.params.id});
        res.status(200).json(listings);
    }
    catch(err){
        next(err);
    }
}