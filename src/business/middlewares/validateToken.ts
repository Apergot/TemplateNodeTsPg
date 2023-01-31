import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { findUserByIdAction } from "../../infrastructure/ActionFactory";

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {

    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({
            message: "Token is missing"
        });
    }

    const token = authorizationHeader.split(" ")[1];

    const secret = process.env.JWT_SECRET_KEY!;

    jwt.verify(token, secret, (error, decoded) => {
        if (error || decoded === undefined) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        const payload = decoded as JwtPayload;

        res.locals.authenticated = true;
        res.locals.user = findUserByIdAction().execute(payload.id);

        console.log(JSON.stringify(res.locals));
        next();
    });    
}