import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    userNotFoundResponse,
} from "./helpers/index.js";

export class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;
            const isValidId = checkIfIdIsValid(userId);

            if (!isValidId) {
                return invalidIdResponse();
            }

            const user = await this.deleteUserUseCase.execute(userId);

            if (!user) {
                return userNotFoundResponse();
            }

            return ok(user);
        } catch (error) {
            console.log(error);
            serverError;
        }
    }
}
