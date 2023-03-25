const axios = require("axios");
const User = require("../models/user");
const {
  GOOGLEREDIRECTURL,
  GOOGLECLIENTSECRET,
  GOOGLECLIENTID,
  PRODUCTION,
} = require("../config");

exports.googleAuth = async (req, res) => {
  const { code } = req.query;

  const accessToken = await getAccessTokenFromGoogle(code);
  const userData = await getUserDataFromAccessToken(accessToken);

  let user = await User.findOne({ email: userData.email });

  if (!user) {
    // create a user
  }

  // const token = Create a token

  // Here I will send the user token as query to the client
  // changes on production
  if (PRODUCTION !== "production") {
    return res.redirect("http://localhost:3000");
  }
  return res.redirect("/");
};

async function getAccessTokenFromGoogle(codeFromGoogle) {
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
