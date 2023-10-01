import User from '../models/user.model.js';

export const updateUser = async(req,res,next)=>{
    const id = req.params.id;
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