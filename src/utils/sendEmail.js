const nodemailer = require("nodemailer");
const { USER, PASS, BACKEND_BASE_URL,CLIENT_ID_NodeMailer,CLIENT_SECRET_NodeMailer,REFRESH_TOKEN } = require("../config");
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(CLIENT_ID_NodeMailer,CLIENT_SECRET_NodeMailer);
OAuth2_client.setCredentials({refresh_token:REFRESH_TOKEN});

const accessToken  = OAuth2_client.getAccessToken();




let transporter = nodemailer.createTransport({
  service :"gmail",
  port:587,
  secure:true,
         auth : {
            type :"OAuth2",
            user : USER,
            clientId : CLIENT_ID_NodeMailer,
            clientSecret : CLIENT_SECRET_NodeMailer,
            refreshToken :REFRESH_TOKEN,
            accessToken :accessToken
         }
});

module.exports = {
  verifyEmail: async function verifyUserEmail(name, userEmail, token) {
    try {
      let info = await transporter.sendMail({
        from: `LinkCollect ${USER}`,
        to: userEmail,
        subject: "Email Verification",
        text: "HELLO" + name,
        html: `<h2>HELLO ${name}<h2/>
                      <h3> Thanks for using our services, Please verify your email </h3>
                      <a href="${BACKEND_BASE_URL}/api/v1/user/verify-email?token=${token}"> Verify You </a>
                    `,
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
