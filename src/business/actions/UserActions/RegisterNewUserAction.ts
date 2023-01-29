import { UserQuery } from "../../queries/UserQuery";
import crypto from "crypto";

export class RegisterNewUserAction {

    private readonly userQuery: UserQuery;

    constructor(userQuery: UserQuery){
        this.userQuery = userQuery;
    }

    async execute(email: string, password: string): Promise<string | null> {
        const user = await this.userQuery.findUserByEmail(email);

        if (user !== null ) return null;

        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

        const newUser = await this.userQuery.createNewUser(email, hashedPassword, salt);

        if (newUser !== null) {
            return 'User created successfully!';
        }
        
        return null;
    }

    //TODO: validate user and persist
}