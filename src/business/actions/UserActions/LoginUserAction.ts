import { UserQuery } from "../../queries/UserQuery";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";

export class LoginUserAction {

    private readonly userQuery: UserQuery;

    constructor(userQuery: UserQuery) {
        this.userQuery = userQuery;
    }

    async execute(email: string, password: string): Promise<string | null> {
        const user = await this.userQuery.findUserByEmail(email);

        if (user === null) return null;

        const hash = crypto.pbkdf2Sync(password,  user.salt, 1000, 64, `sha512`).toString(`hex`);
        
        if (hash !== user.password) return null;

        const secret = process.env.JWT_SECRET_KEY!;

        const payload = {
            id: user.id, 
            name: user.username, 
            email: user.email
        };

        return jsonwebtoken.sign(payload, secret, {expiresIn: '24h'});
    }
}