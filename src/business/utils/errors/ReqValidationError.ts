import { ValidationError } from "express-validator";
import { CustomError } from "./CustomError";

export class ReqValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super();
        Object.setPrototypeOf(this, ReqValidationError.prototype);
    }

    formatErrors() {
        return this.errors.map((err) => {
            return { message: err.msg, field: err.param };
        });
    }
}