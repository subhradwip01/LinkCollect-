const nodemailer = require("nodemailer");
const { USER, PASS, BACKEND_URL } = require("../config");

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: USER,
    pass: PASS,
  },
});

module.exports = {
  verifyEmail: async function verifyUserEmail(name, userEmail, token) {
    try {
      let info = await transporter.sendMail({
        from: USER,
        to: userEmail,
        subject: "Email Verification",
        text: "HELLO" + name,
        html: `<h2>HELLO ${name}<h2/>
                      <h3> Thanks for using our services, Please verify your email </h3>
                      <a href="${BACKEND_URL}/v1/user/verify-email?token=${token}"> Verify You </a>
                    `,
      });
      console.log(info.messageId);
      console.log("Testing email functionality");
    } catch (error) {
      console.log(error);
    }
  },
};
