const nodemailer = require("nodemailer");
import { verifyEmail } from "constants/emailTemps/verifyEmail";
// const { USER, PASS, BACKEND_BASE_URL,CLIENT_ID_NodeMailer,CLIENT_SECRET_NodeMailer,REFRESH_TOKEN } = require("../config/index");
import env from "../config/index";
import { sendOTPMail } from "../constants/emailTemps/sendOTPMail";

let transporter = nodemailer.createTransport({
  service :"gmail",
  port:587,
  host:'smtp.gmail.com',
  // secure:true,
  secure:false,// done by harsh
         auth : {
          
            user : env.USER,
            pass : env.PASS
            
         }
});



 const Email = {
  verifyEmail: async function verifyUserEmail(name: any, userEmail: any, token: any) {
    try {
      let info = await transporter.sendMail({
        from: `LinkCollect ${env.USER}`,
        to: userEmail,
        subject: "LinkCollect Verification Link",
        text: "LinkCollect Verification Link for " + name,
        html: verifyEmail(name, env.BACKEND_BASE_URL, token),
      },function(error,result){
        if(error){
         console.log("err",error);
        } else {
          console.log(result);
        }
        transporter.close();}
      );
    } catch (error) {
      console.log("error",error);
    }
  }, 
};

export default Email;
