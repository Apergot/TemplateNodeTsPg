import { CustomError } from './CustomError';

export class NotFoundError extends CustomError {
    statusCode = 404;
    
    constructor() {
        super();
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    formatErrors() {
        return [{ message: 'Route does not exists' }];
    }
}