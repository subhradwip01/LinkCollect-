const axios = require("axios");
const User = require("../models/user");
const {
  generateFromEmail,
  generateUsername,
} = require("unique-username-generator");
const {
  GOOGLEREDIRECTURL,
  GOOGLECLIENTSECRET,
  GOOGLECLIENTID,
  PRODUCTION,
} = require("../config");
const UserService = require("../services/userService");

const userService = new UserService();

exports.googleAuth = async (req, res) => {
  const { code } = req.query;

  const accessToken = await getAccessTokenFromGoogle(code);
  const userData = await getUserDataFromAccessToken(accessToken);

  let user = await User.findOne({ email: userData.email });

  if (!user) {
    user = await User.create({
      name: userData.name,
      email: userData.email,
      username: userData.email.split('@')[0],
    });
  }

  // const token = Create a token
  const token = userService.createToken({ userId: user._id, username: user.username });

  // Sending user Token as query to the client
  // changes on production
  if (PRODUCTION !== "production") {
    return res.redirect(`http://localhost:3000/login?token=${token}`);
  }
  return res.redirect(`https://api.linkcollect.io/login?token=${token}`);
};

async function getAccessTokenFromGoogle(codeFromGoogle) {
  const { data } = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: GOOGLECLIENTID,
      client_secret: GOOGLECLIENTSECRET,
      redirect_uri: GOOGLEREDIRECTURL,
      grant_type: "authorization_code",
      code: codeFromGoogle,
    },
  });

  return data.access_token;
}

async function getUserDataFromAccessToken(accessToken) {
  const { data } = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
}
