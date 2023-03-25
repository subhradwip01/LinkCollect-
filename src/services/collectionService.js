const CollectionRepo = require('../repository/collectionRepo');

class CollectionService {
     constructor(){
         this.collectionRepo = new CollectionRepo();
     }
     create = async(data) => {
        try {
            const collection = await this.collectionRepo.create(data);
            return collection;
        } catch (error) {
            throw error;
        }

     }
     update = async(id,data)  => {
        try {
            const collection = await this.collectionRepo.update(id,data);
            return collection;
        } catch (error) {
            throw error;
        }
     }
     get = async(id) => {
        try {
            const collection = await this.collectionRepo.get(id);
            return collection;
        } catch (error) {
            throw error;
        }
     }
     delete = async(id) => {
        try {
            const collection = await this.collectionRepo.delete(id);
            return collection;
        } catch (error) {
            throw error;
        }
     }
     getAllWithTimeline = async(id) => {
         try {
            const collection = await this.collectionRepo.getAllWithTimeline(id);
            return collection;
         } catch (error) {
            throw error;
         }
     }
     getAll = async(id) => {
        try {
            const collection = await this.collectionRepo.getAll(id);
            return collection;
        } catch (error) {
            throw error;
        }
     }
}

module.exports = CollectionService;