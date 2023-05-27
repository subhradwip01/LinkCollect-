const User = require("../models/user");
const { verifyEmail } = require("../utils/sendEmail");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      verifyEmail(user.name, user.email, user.emailToken);
      return user;
    } catch (error) {
      console.log("Something went wrong at repository layer", error);
      console.log(error);           
      throw error;
    }
  }
  async togglePrivacy(userId) {
    try {
      const user = await User.findById(userId);
      user.isPublic = !user.isPublic;
      await user.save();
      return user;
    } catch (error) {
      console.log("Something went wrong at repository layer", error);
      console.log(error);           
      throw error;
    }
  }
  async verifyEmailtoken(token) {
    try {
      const user = await User.findOne({ emailToken: token });
      if (!user) {
        console.log("User dosent exist");
        console.log(error);           
      throw error;
      }
      var data = {
        emailToken: null,
        verified: 1,
      };
      //   await User.update(data, {
      //     where: {
      //       emailtoken: token
      //     }
      //   });
      await User.findOneAndUpdate({ emailToken: token }, data);
      return user;
    } catch (error) {
      console.log("Something went wrong in the verification of mail");
      console.log(error);           
      throw error;
    }
  }
  async destroy(userId) {
    try {
      await User.findByIdAndRemove(userId);
      return true;
    } catch (error) {
      console.log("Something went wrong at repository layer");
      console.log(error);           
      throw error;
    }
  }
  async updateProfilePic({userId, profilePic}) {
    try {
      const user = await User.findByIdAndUpdate(userId, {profilePic});
      return user.profilePic;
    } catch (error) {
      console.log("Something went wrong at repository layer");
      console.log(error);           
      throw error;
    }
  }
  async getwithCollection(userId) {
    try {
      const user = await User.findById(userId)
        .populate({ path: "collections" })
        .lean();
      return user;
    } catch (error) {
      console.log(error);           
      throw error;
    }
  }
  async getByUserId(userId) {
    try {
      const user = await User.findById(userId).populate(({ path: "collections" })).lean();
      return user;
    } catch (e) {
      console.log("Something went wrong in fetching the user");
      throw e;
    }
  }
  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        email: userEmail,
      });
      return user;
    } catch (error) {
      console.log("Something went wrong in fetching the user");
      console.log(error);           
      throw error;
    }
  }

  async checkUsername(username){
    try {
      const user = await User.findOne(username);
      if(user){
        throw new Error("Username is not available");
      } else {
        return "Username available";
      } 
    } catch (error) {
      console.log("Something went wrong in fetching the user");
      console.log(error);           
      throw error;
    }
  }

  async getByUsername(username) {
    try {
      const user = await User.findOne({ username }).populate({ path: "collections" })
      .lean();
      return user;
    }
    catch (error) {
      console.log("Something went wrong in fetching the user")
      console.log(error);           
      throw error;
    }
  }

}

module.exports = UserRepository;
