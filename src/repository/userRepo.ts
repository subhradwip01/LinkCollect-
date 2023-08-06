import User from "../models/user";
import Email from "../utils/sendEmail";
import { Collection } from "../models/index";
// import CollectionRepo from "./collectionRepo";
class UserRepository {
  async create(data) {
    try {
      // console.log("3", 3);

      // const collection: any = await Collection.create({ title: "Untitled Private Collection 🔥", description: "you  can create many such collection using linkcollect, and share them across devices and friends. You can edit everything about this collections easily", isPublic: false});
      // console.log("collection", collection, data.collections)

      const user = await User.create(data);
      Email.verifyEmail(user.name, user.email, user.emailToken);
      // await user.save();

      /** 
      const existingCollection = await Collection.findOne({
        userId: user._id,
        title: "Untitled Private Collection 🔥"
      });
      
      let collection: any;
      if (!existingCollection) {
        collection = await Collection.create({
          title: "Untitled Private Collection 🔥",
          description: "you can create many such collections using linkcollect, and share them across devices and friends. You can edit everything about these collections easily",
          isPublic: true,
          userId: user._id,
          tags: ["Science"],
          username: user.username
        }); */



      // user.collections.push(collection); 
      await user.save();
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
      console.log("data",data);
      await User.findOneAndUpdate({ emailToken: token }, data);


      await user.save(); 

      return user;
    } catch (error) {
      console.log("Something went wrong in the verification of mail");
      console.log(error);
      throw error;
    }
  }
  async createSocials(userId,data:[]){
    try {
       const user = await User.findById(userId);
       const userSocialData = user?.socials;
       console.log(userSocialData);

       if (userSocialData && userSocialData?.length > 0) {
        console.log(userSocialData.length);
        data.forEach((socialEntry) => {
          const companyName = Object.keys(socialEntry)[0];
          const existingIndex = userSocialData.findIndex((userEntry) => Object.keys(userEntry)[0] === companyName);
      
          if (existingIndex !== -1) {
            // Update existing entry
            userSocialData[existingIndex][companyName] = socialEntry[companyName];
          } else {
            // Push new entry
            userSocialData.push(socialEntry);
          }
        });
      } else {
        console.log("No social data found.");
        throw new Error("No data was found");
      }

      console.log(userSocialData);

      return "ok";
      
    } catch (error) {
      console.log("Something went wrong at repository layer");
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
      const user = await User.findById(userId)
        .populate({ path: "collections" })
        .lean();
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
      const user = await User.findOne({ username })
        .populate({ path: "collections" })
        .lean();
      return user;
    } catch (error) {
      console.log("Something went wrong in fetching the user");
      console.log(error);
      throw error;
    }
  }

  async setPremium(data, userId) {
    try {

  console.log("here", data, userId)
      const user = await User.findOne({ _id: userId });
      if (!user) {
        throw new Error("Username is not available");
      }
      console.log("user", user.username)
      if(user.username !== "askwhyharsh" ) {
        throw new Error("no admin");
      }
      // run a loop for each data value, data consist a list of objects. each object has a userId and a premium value (bool); we need to update the premium value of the user with the given userId
      if(data.list == null) {
        throw new Error("No data provided")
      }


      console.log("here")
      for (let i = 0; i < data.list.length; i++) {

        let user = await User.findOne({username: data.list[i].username});
        if(!user || !data.list[i].premium) {
          continue
        }
        user.isPremium = data.list[i].premium;
        await user.save();
        // console.log("user", user)
      }
   
      return data;
    } catch (error) {
      console.log("Something went wrong in fetching the user");
      console.log(error);
      throw error;
    }


  }


}

export default UserRepository;
