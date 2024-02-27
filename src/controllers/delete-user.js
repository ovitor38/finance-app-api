import { DeleteUserUseCase } from "../use-cases/delete-user.js";
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    userNotFoundResponse,
} from "./helpers/index.js";

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;
            const isValidId = checkIfIdIsValid(userId);

            if (!isValidId) {
                return invalidIdResponse();
            }
            const deleteUserUseCase = new DeleteUserUseCase();

            const user = await deleteUserUseCase.execute(userId);

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
