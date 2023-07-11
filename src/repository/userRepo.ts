import User from "../models/user";
import Email from "../utils/sendEmail";

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      Email.verifyEmail(user.name, user.email, user.emailToken);
      return user;
    } catch (error) {
      console.log("Something went wrong at repository layer", error);
      console.log(error);
      throw error;
    }
  }

  async togglePrivacy(userId) {
    try {
      const user: any = await User.findById(userId);
      user.isPublic = !user.isPublic;
      await user.save();
      return user;
    } catch (error) {
      console.log("Something went wrong at repository layer", error);
      console.log(error);
      throw error;
    }
  }

  async verifyEmailToken(token) {
    try {
      const user: any = await User.findOne({ emailToken: token });
      if (!user) {
        console.log("User doesn't exist");
        throw "User doesn't exist";
      }
      var data = {
        emailToken: null,
        verified: 1,
      };
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

  async updateProfilePic({ userId, profilePic }) {
    try {
      const user: any = await User.findByIdAndUpdate(userId, { profilePic });
      return user.profilePic;
    } catch (error) {
      console.log("Something went wrong at repository layer");
      console.log(error);
      throw error;
    }
  }

  async getWithCollection(userId) {
    try {
      const user = await User.findById(userId).populate({ path: "collections" }).lean();
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getByUserId(userId) {
    try {
      const user = await User.findById(userId).populate({ path: "collections" }).lean();
      return user;
    } catch (error) {
      console.log("Something went wrong in fetching the user");
      throw error;
    }
  }

  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({ email: userEmail });
      return user;
    } catch (error) {
      console.log("Something went wrong in fetching the user");
      console.log(error);
      throw error;
    }
  }

  async checkUsername(username) {
    try {
      const user = await User.findOne(username);
      if (user) {
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
      const user = await User.findOne({ username }).populate({ path: "collections" }).lean();
      return user;
    } catch (error) {
      console.log("Something went wrong in fetching the user");
      console.log(error);
      throw error;
    }
  }
}

export default  UserRepository;