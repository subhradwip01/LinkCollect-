const { Collection,User } = require('../models/index');

class CollectionRepo {
    
    create = async (data) => {
        try {
            const collection = await Collection.create(data);
            const user = await User.findById(collection.userId);
            console.log("in repo",user);
            user.Collections.push(collection);
            await user.save();
            return collection;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    delete = async (id) => {
        try {
           const collection = await Collection.findByIdAndRemove(id);
           return collection;
        } catch (error) {
           throw error;
        }
     }
     get = async(id) => {
        try {
            const collection =await Collection.findById(id);
            return collection;
        } catch (error) {
           throw error;
        }
     }
     getAll = async(id) => {
        try {
            const collection = await Collection.findById(id);
            return collection;
        } catch (error) {
            throw error;
        }
     }
     getAllCollectionsWithTimeline = async(id)=>{ //userid
        try {
            const collection = await Collection.findById(id).populate({path:'timeline'}).lean();
            return collection;
        } catch (error) {
            throw error;
        }
     }
     update = async(id,data) => {
         try {
            // console.log(data);
             const collection = await Collection.findByIdAndUpdate(id,data,{new:true});
             return collection;
         } catch (error) {
             throw error;
         }
     }
}
module.exports = CollectionRepo;