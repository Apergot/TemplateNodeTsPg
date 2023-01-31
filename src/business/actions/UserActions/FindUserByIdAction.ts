import { User } from "../../model/User";
import { UserQuery } from "../../queries/UserQuery";

export class FindUserByIdAction {

    private readonly userQuery: UserQuery;

    constructor(userQuery: UserQuery) {
        this.userQuery = userQuery;
    }

    async execute(id: number): Promise<User | null> {
        const user = await this.userQuery.findUserById(id);
        if (user === null) return null;
        return user;
    }
}