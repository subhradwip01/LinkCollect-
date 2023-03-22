const { Collection } = require('../models/index');

class CollectionRepo {
    create = async (data) => {
        try {
            const collection = await Collection.create(data);
            return collection;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = CollectionRepo;