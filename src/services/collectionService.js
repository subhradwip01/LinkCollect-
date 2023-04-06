const CollectionRepo = require("../repository/collectionRepo");


class CollectionService {
  constructor() {
    this.collectionRepo = new CollectionRepo();
  }
    create = async (data, userId) => {
      try {
      
      const collection = await this.collectionRepo.create(data, userId);
      return collection;
    } catch (error) {
      throw error;
    }
  };
  update = async (id, data) => {
    try {
      const collection = await this.collectionRepo.update(id, data);
      return collection;
    } catch (error) {
      throw error;
    }
  };
  get = async (id) => {
    try {
      const collection = await this.collectionRepo.get(id);
      return collection;
    } catch (error) {
      throw error;
    }
  };
  delete = async (id) => {
    try {
      const collection = await this.collectionRepo.delete(id);
      return collection;
    } catch (error) {
      throw error;
    }
  };
  getAllWithTimeline = async (userId) => {
    try {
      const collection =
        await this.collectionRepo.getAllCollectionsWithTimeline(userId);
      return collection;
    } catch (error) {
      throw error;
    }
  };
  getAll = async (userId) => {
    try {
      const collection = await this.collectionRepo.getAll(userId);
      return collection;
    } catch (error) {
      throw error;
    }
  };
  upvote = async(collectionId,userId) => {
    try {
      const collection = await this.collectionRepo.upvote(collectionId,userId);
      return collection;
    } catch (error) {
      throw error;
    }
  };
  downvote = async(collectionId,userId) => {
    try {
      const collection = await this.collectionRepo.downvote(collectionId,userId);
      return collection;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CollectionService;
