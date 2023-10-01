import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json("You need to Login");
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user)=>{
        if(err){
            return res.status(403).json("Invalid Token");
        }
        req.user = user;
        next();
    }
    )
}