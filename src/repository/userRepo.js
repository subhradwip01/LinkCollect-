const User = require('../models/user');
const { verifyEmail } = require('../utils/sendEmail');


class UserRepository {

    async create(data) {
        try {
            console.log("repo",data);
            const user = await User.create(data);
            console.log(user);
            verifyEmail(user.Name, user.email, user.emailToken);
            return user;
        } catch (error) {
            console.log("Something went wrong at repository layer",error);
            throw (error);
        }
    }
    async verifyEmailtoken(token) {
        try {

            const user = await User.find({ emailToken: token });
            console.log("verifying user");
            if (!user) {
                console.log('User dosent exist');
                throw error;
            }
            var data = {
                emailToken: "null",
                verified: 1
            }
            const userUpdated = await User.findOneAndUpdate({ emailToken: token }, data);
            console.log(userUpdated);

            return 'Verification Successfull!';
        } catch (error) {
            console.log("Something went wrong in the verification of mail");
            throw error;
        }
    }
    async destroy(userId) {
        try {
            await User.findByIdAndRemove(userId);
            return true;
        } catch (error) {
            console.log("Something went wrong at repository layer");
            throw (error);
        }
    }
    async getwithCollection(userId){
        try {

            const user = await User.findById(userId).populate({path:"Collections"}).lean();
            return user;
        } catch (error) {
            throw error;
        }
    }
    async getByUserId(userId) {
        try {
            const user = await User.findById(userId);
            return user;
        } catch (e) {
            console.log("Something went wrong in fetching the user");
            throw e;
        }
    }
    async getByEmail(userEmail) {
        try {
            const user = await User.findOne(
                {
                    email: userEmail
                }
            );
            return user;
        } catch (error) {
            console.log("Something went wrong in fetching the user");
            throw error;
        }
    }

    async getById(userId) {
        console.log("here", userId)
        try {
            const user = await User.findAll(
                { id: userId },
            );
            // delete user.password;
            return user;
        } catch (error) {
            console.log("Something went wrong at repository layer");
            throw (error);
        }
    }


}

module.exports = UserRepository;