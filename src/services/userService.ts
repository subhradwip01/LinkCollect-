import UserRepository from "../repository/userRepo";
import config from "../config/index";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import randomBytes from "randombytes";
import mongoose, { isValidObjectId } from "mongoose";

import CollectionService from "../services/collectionService";
const collectionService = new CollectionService()

class UserService {
  userRepository: any;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async validateNewUser(data) {

    console.log("data", data)
    data.username = data.email.split("@")[0];
    data.email = data.email.trim();
    data.emailToken = randomBytes(32).toString("hex");
    data.verified = 0;
    if(data.isPremium) {
      data.isPremium = false
    }

    if (data.username && data.username.length < 3) {
      data.username = data.username + randomBytes(3).toString("hex"); // to make username unique and not too long add 2 randome numbers and two chars
    }

    if (data.username) {
      const check = await this.userRepository.checkUsername({
        username: data.username,
      });
      if ("Username available" !== check) {
        data.username = data.username + randomBytes(3).toString("hex"); // to make username unique and not too long add 2 randome numbers and two chars
      }
    }

    if (data.social && data.social.length != 0) {
      let socialData = data.social;
      let social: Array<{ [key: string]: string }> = [];
      socialData.forEach((url) => {
        let companyName = this.extractCompanyName(url);
        social.push({ [companyName]: url });
      });
      data.social = social;
    }


    return data
  }
  async create(data) {
    try {
      data = await this.validateNewUser(data)
      const user = await this.userRepository.create(data);

      // create a random collection 
      const collectionData = {
          title: "Random Collection", 
          userId: user.id,
          description: "this is a private collection, save all random links here ",
          username: user.username,
          isPublic: false,
          isPinned: true, 
          pinnedTime: Date.now()
        } 

      await collectionService.create(collectionData)

      await user.save();
      return user;
    } catch (error) {
      console.log("Something went wrong Service layer. ", error);
      throw error;
    }
  }
  async togglePrivacy(userId) {
    try {
      const user = await this.userRepository.togglePrivacy(userId);
      return user;
    } catch (error) {
      console.log("Something went wrong Service layer.");
      throw error;
    }
  }
  async destroy(data) {
    try {
      const user = await this.userRepository.destroy(data);
      return true;
    } catch (error) {
      console.log("Something went wrong Service layer.");
      throw error;
    }
  }
  extractCompanyName(url): string {
    let regex = /\/\/(?:www\.)?([^\/]+)\./; // Matches the domain part of the URL
    let match = url.match(regex);
    if (match && match[1]) {
      let domain = match[1].replace("_", ""); // Remove underscore from the domain name
      return domain.charAt(0).toUpperCase() + domain.slice(1);
    } else {
      return "Unknown";
    }
  }
  async setSocials(userId, data: []) {
    try {
      let socialsData: Array<{ [key: string]: string }> = [];
      data.forEach((url) => {
        let companyName = this.extractCompanyName(url);
        socialsData.push({ [companyName]: url });
      });
      console.log(socialsData);
      const user = await this.userRepository.createSocials(userId, socialsData);
      return user;
    } catch (error) {
      console.log("Something went wrong Service layer.");
      throw error;
    }
  }
  async verifyEmailtoken(token) {
    try {
      console.log("token", token);
      const user = await this.userRepository.verifyEmailToken(token);
      return user;
    } catch (error) {
      console.log("Something went wrong Service layer.", error);
      throw error;
    }
  }
  async updateProfilePic(data) {
    try {
      const profilePic = await this.userRepository.updateProfilePic(data);
      return profilePic;
    } catch (error) {
      console.log("Something went wrong Service layer.");
      throw error;
    }
  }
  async getUser(userId) {
    try {
      const user = await this.userRepository.getById(userId);
      return user;
    } catch (error) {
      console.log("Something went wrong Service layer.");
      throw error;
    }
  }
  async getWithCollection(userId) {
    try {
      const user = await this.userRepository.getwithCollection(userId);
      return user;
    } catch (error) {
      console.log("Something went wrong Service layer.");
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, config.JWT_KEY, { expiresIn: "1h" });
      return result;
    } catch (error) {
      console.log("Something went wrong in token creation.");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, config.JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong during verification of the token");
      throw error;
    }
  }

  async signIn(userEmail, plainPassword) {
    try {
      
      const user = await this.userRepository.getByEmail(userEmail, true);
      const encryptedPassword = user.password;
      const passwordMatch = this.checkPassword(
        plainPassword,
        encryptedPassword
      );

      if (!passwordMatch) {
        console.log("Password doesn't match");
        throw { error: "Incorrect password" };
      }
      if (user.verified == 0) {
        console.log("Email not verifed");
        throw { error: "Email not verifed" };
      }

      const newJWTtoken = this.createToken({
        userId: user._id,
        username: user.username,
      });
      // console.log("->", user, user._doc)
      
      // const { password, ...userData } = user._doc;
      delete user.password;
      delete user.emailToken;

      return { userId: user._id, token: newJWTtoken, userData: user };
    } catch (error) {
      console.log("Something went wrong in signIn process", error);
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const isTokenverified = this.verifyToken(token);
      if (!isTokenverified) {
        throw { error: "Invalid token" };
      }
      const user = await this.userRepository.getById(isTokenverified.id);
      if (!user) {
        throw { error: "No user with the corresponding token exists!" };
      }
      console.log("->", user);
      return user.id;
    } catch (error) {
      console.log("Something went wrong in the auth process");
      throw error;
    }
  }

  checkPassword(userInputPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in password comparison");
      throw error;
    }
  }

  async isAdmin(userId) {
    try {
      return await this.userRepository.isAdmin(userId);
    } catch (error) {
      console.log("Something went wrong in service layer!");
      throw error;
    }
  }
  async grantRole(userId, roleId) {
    try {
      console.log(userId, roleId);
      const response = await this.userRepository.grantAccess(userId, roleId);
      return response;
    } catch (error) {
      console.log("Something went wrong in service layer!");
      throw error;
    }
  }
  async getUserById(userId) {
    try {
      console.log(userId);
      const response = await this.userRepository.getByUserId(userId);
      return response;
    } catch (error) {
      console.log("Something went wrong in service layer!");
      throw error;
    }
  }
  async checkUsername(username) {
    try {
      console.log(username);
      const response = await this.userRepository.checkUsername(username);
      return response;
    } catch (error) {
      console.log("Something went wrong in service layer!");
      throw error;
    }
  }
  async setPremium(data, userId) {
    try {
      const response = await this.userRepository.setPremium(data, userId);
      return response;
    } catch (error) {
      console.log("Something went wrong in service layer!");
      throw error;
    }
  }
  async getByUsername(username, userId) {
    try {
      console.log(username, userId);
      const validUserId = mongoose.isValidObjectId(userId);
      if (!validUserId) {
        console.log("userService.getByUsername says userid its null");
      }
      if (validUserId) {
        const user = await this.userRepository.getByUserId(userId);
        var isSameUser = user.username === username;
      } else {
        isSameUser = false;
      }
      const response = await this.userRepository.getByUsername(username);
      delete response.password;
      delete response.emailToken;
      console.log("isSameUser", isSameUser);
      if (isSameUser) {
        return response;
      } else {
        const collection: any = [];
        for (let i = 0; i < response.collections.length; i++) {
          if (response.collections[i].isPublic) {
            collection.push(response.collections[i]);
          }
        }
        response.collections = collection;
        return response;
      }
    } catch (error) {
      console.log("Something went wrong in service layer!");
      throw error;
    }
  }
}

export default UserService;
