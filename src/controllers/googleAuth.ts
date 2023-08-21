import axios from "axios";
import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import config from "../config/index";


import UserService from "../services/userService";
import { Collection } from "mongoose";


const userService = new UserService();
// const User: IUser = require("../models/user");
export const googleAuth = async (req: Request, res: Response) => {
  const { code } = req.query;

  const accessToken = await getAccessTokenFromGoogle(code as string);
  const userData = await getUserDataFromAccessToken(accessToken);

  let user = await User.findOne({ email: userData.email });

   if (!user) {
    user = await User.create({
      name: userData.name,
      email: userData.email,
      username: userData.email.split("@")[0],
      profilePic: userData.picture,
      verified: 1
    });



  }


  const token = userService.createToken({
    userId: user._id,
    username: user.username,
  });

  if (user.profilePic === undefined || user.profilePic !== userData.picture) {
    user.profilePic = userData.picture;
    await user.save();
  }

  if (config.PRODUCTION !== "production") {
    return res.redirect(`http://localhost:3001/login?token=${token}`);
  }
  return res.redirect(`${config.PRODUCTION_FRONTEND_URL}/login?token=${token}`);
};

async function getAccessTokenFromGoogle(codeFromGoogle: string) {
  const { data } = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: config.GOOGLECLIENTID,
      client_secret: config.GOOGLECLIENTSECRET,
      redirect_uri: config.GOOGLEREDIRECTURL,
      grant_type: "authorization_code",
      code: codeFromGoogle,
    },
  });

  return data.access_token;
}

async function getUserDataFromAccessToken(accessToken: string) {
  const { data } = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
}

// export default googleAuth;
