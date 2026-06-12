const jwt=require('jsonwebtoken');

const CheckToken=(req,res,next)=>{
    const token= req.cookies.token;
    if(!token){
        return res.status(401).json({errors:"Unauthorized"});
    }
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(err){
            return res.status(401).json({errors:"Invalid token"});
        }
       
        next();
    });
}

module.exports=CheckToken;