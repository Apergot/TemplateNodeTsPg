import { Response } from "express";
import { User } from "../../model/User";
import { UserQuery } from "../../queries/UserQuery";

export class LoginUserAction {

    private readonly userQuery: UserQuery;

    constructor(userQuery: UserQuery) {
        this.userQuery = userQuery;
    }

    async execute(email: string, password: string, response: Response) {
        //const user: User = await this.userQuery.findUserByEmail(email);
        //TODO
    }
}