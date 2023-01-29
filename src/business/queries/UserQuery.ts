import { User } from "../model/User";

export interface UserQuery {
    findUserByEmail(email: string): Promise<User | null>;
    createNewUser(email: string, hashedPassword: string, salt: string): Promise<User | null>;
}