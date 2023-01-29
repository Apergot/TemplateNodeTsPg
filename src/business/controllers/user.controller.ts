import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";
import { registerNewUserAction, loginUserAction } from "../../infrastructure/ActionFactory";
import { ReqValidationError } from "../utils/errors/ReqValidationError";
import { UserCredentialsValidation } from "../utils/errors/ValidationErrors";

export class UserController {

    public router = Router();

    constructor() {
        this.setRoutes();
    }

    public setRoutes() {

        this.router.get("/", (req: Request, res: Response) => {
            res.send('This shit is working already');
        });

        this.router.post('/register', UserCredentialsValidation, async (req: Request, res: Response) => {

            const validationErrors = validationResult(req);
            if(!validationErrors.isEmpty()) {
                throw new ReqValidationError(validationErrors.array());
            }

            const result = registerNewUserAction().execute(req.body.email, req.body.password);
            
            if (result !== null) {
                res.send(result).status(200);
            } else {
                res.send("Could not create user, try again later").status(500);
            }
            
        });

        this.router.post("/request_token", async (req: Request, res: Response) => {
            
            const validationErrors = validationResult(req);
            if(!validationErrors.isEmpty()) {
                throw new ReqValidationError(validationErrors.array());
            }
            
            const result = await loginUserAction().execute(req.body.email, req.body.password);
            if (result !== null) {
                res.json({jwt: result}).status(200);
            } else {
                res.send('Unauthorized').status(401);
            }

        });
    }
}