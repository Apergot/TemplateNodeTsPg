import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";
import { registerNewUserAction } from "../../infrastructure/ActionFactory";
import { ReqValidationError } from "../utils/errors/ReqValidationError";
import { UserRegistrationValidation } from "../utils/errors/ValidationErrors";

export class UserController {

    public router = Router();

    constructor() {
        this.setRoutes();
    }

    public setRoutes() {

        this.router.get("/", (req: Request, res: Response) => {
            res.send('This shit is working already');
        });

        this.router.post('/register', UserRegistrationValidation, (req: Request, res: Response) => {

            const validationErrors = validationResult(req);
            if(!validationErrors.isEmpty()) {
                throw new ReqValidationError(validationErrors.array());
            }

            const result = registerNewUserAction().execute(req.body.email, req.body.password);
            
            if (result !== null) {
                return res.send(result).status(200);
            }
            
            return res.send("Could not create user, try again later").status(500);
        });

        this.router.get("/request_token", (req: Request, res: Response) => {
            //let jwt = loginUserAction().execute(email, password);
            res.send('This shit is working already');
        });
    }
}