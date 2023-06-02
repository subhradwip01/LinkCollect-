
const checkSpecialCharacters = (req,res,next)=>{
    const username = req.body.username;
   // console.log("here",username);
    const specialChars = username.match(/[^A-Za-z0-9\s]/g);
   // console.log(specialChars);
    if(specialChars!=null){
        return res.status(404).json({
            message : "Username contained special characters!",
            error : "Validation Error",
            success : false,
        })
    }
    next();
}



module.exports = checkSpecialCharacters;