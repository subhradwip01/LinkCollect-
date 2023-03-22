const axios = require("axios");
const {
  GOOGLEREDIRECTURL,
  GOOGLECLIENTSECRET,
  GOOGLECLIENTID,
} = require("../config");
const User = require("../models/user");

exports.googleRedirect = async (req, res) => {
  const { code } = req.query;

  const accessToken = await getAccessTokenFromGoogle(code);
  const userData = await getUserDataFromAccessToken(accessToken);

  console.log(userData);
  // const registeredUser = await User.find({ email: userData.email });

  // if (registeredUser) {
  // } else {
  // }

  // Add jwt cookies

  // Redirects to the client side
  //   return res.redirect("/");
};

const getAccessTokenFromGoogle = async (codeFromGoogle) => {
  const { data } = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: GOOGLECLIENTID,
      client_secret: GOOGLECLIENTSECRET,
      redirect_uri: GOOGLEREDIRECTURL, // changes on production
      grant_type: "authorization_code",
      code: codeFromGoogle,
    },
  });

  return data.access_token;
};

const getUserDataFromAccessToken = async (accessToken) => {
  const { data } = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

// function loginUser() {
//   // Add cookies
// }

// async function registeredUser() {
//   const user = await User.create({
//     Email: userData.email,
//     Name: userData.name,
//     ProfilePic: userData.picture,
//   });
// }
