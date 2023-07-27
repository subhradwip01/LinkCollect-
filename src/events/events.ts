import { EventEmitter } from './io';

export default class Emit {
    collectionUpvoted = (payload) => { 
        EventEmitter("collection:upvoted", payload);
    }

    collectionDownvoted = (payload) => {
        EventEmitter("collection:downvoted", payload);
    }

    collectionCreated = (payload) => {
        EventEmitter("collection:created", payload);
    }

    collectionDeleted = (payload) => {
        EventEmitter("collection:deleted", payload);
    }

    bookmarkAdded = (payload) => {
        EventEmitter("bookmark:added", payload);
    }

    bookmarkDeleted = (payload) => {
        EventEmitter("bookmark:deleted", payload);
    }

}