const { User } = require("../models");

const isOwner = async(req,res,next) => {
    const isSameUser = false;
    console.log(req.params.username, "hello",req.body.username);
    const user = User.findOne(req.params.username);

    isSameUser;


    next();
}

module.exports = isOwner;