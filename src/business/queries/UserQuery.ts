import { User } from "../model/User";

export interface UserQuery {
    findUserById(id: number): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    createNewUser(email: string, hashedPassword: string, salt: string): Promise<User | null>;
}