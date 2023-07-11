module.exports = class CustomError extends Error{
    constructor(message,status){
        super();
        this.message = message;
        this.status = status
    }
}