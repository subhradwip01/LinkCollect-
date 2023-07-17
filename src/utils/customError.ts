export default class CustomError extends Error {
    status: any;

    constructor(message: string, status: any) {
        super(message);
        this.status = status;
    }
}
