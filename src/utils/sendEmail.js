const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    secure:false,
    auth :{
        user:process.env.USER,
        pass:process.env.PASS,
    }
})

module.exports = {
    verifyEmail : async function verifyUserEmail(name,userEmail,token){
        try {
            let info = await transporter.sendMail({
                from:process.env.USER,
                to:userEmail,
                subject:"Email Verification",
                text:"HELLO"+name,
                html:`<h2>HELLO ${name}<h2/>
                      <h3> Thanks for using our services, Please verify your email </h3>
                      <a href="${process.env.BASE_URL}api/v1/verify-email?token=${token}"> Verify You </a>
                    `
            });
            console.log(info.messageId);
            console.log('Testing email functionality');
        } catch (error) {
            console.log(error);
        }
    }
}