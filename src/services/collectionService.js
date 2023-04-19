const CollectionRepo = require("../repository/collectionRepo");


class CollectionService {
  constructor() {
    this.collectionRepo = new CollectionRepo();
  }
  create = async (data) => {
    try {

      const collection = await this.collectionRepo.create(data);
      return collection;
    } catch (error) {
      throw error;
    }
  };
  async togglePrivacy(userId) {
    try {

      const collection = await this.collectionRepo.togglePrivacy(userId);
      return collection;
    } catch (error) {
      console.log("Something went wrong Service layer.");
      throw error;
    }
  }
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

  getAllByUsername = async (username, ownsUsername) => {
    try {
      const collection =
        await this.collectionRepo.getAllByUsername(username, ownsUsername);
      return collection;
    } catch (error) {
      throw error;
    }
  };

  doesLinkExist = async (collectionId, link) => {
    try {
      const response =
        await this.collectionRepo.doesLinkExist(collectionId, link);
      return response;
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
  upvote = async (collectionId, userId) => {
    try {
      const collection = await this.collectionRepo.upvote(collectionId, userId);
      return collection;
    } catch (error) {
      throw error;
    }
  };
  downvote = async (collectionId, userId) => {
    try {
      const collection = await this.collectionRepo.downvote(collectionId, userId);
      return collection;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CollectionService;
