import { FindUserByIdAction } from "../business/actions/UserActions/FindUserByIdAction";
import { LoginUserAction } from "../business/actions/UserActions/LoginUserAction";
import { RegisterNewUserAction } from "../business/actions/UserActions/RegisterNewUserAction";
import { PsqlUserQueries } from "./queries/PsqlUserQueries";

export function registerNewUserAction() {
    return new RegisterNewUserAction(
        new PsqlUserQueries()
    );
}

export function loginUserAction() {
    return new LoginUserAction(
        new PsqlUserQueries()
    );
}

export function findUserByIdAction() {
    return new FindUserByIdAction(
        new PsqlUserQueries()
    );
}