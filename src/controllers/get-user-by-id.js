import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    userNotFoundResponse,
} from "./helpers/index.js";

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isValidId = checkIfIdIsValid(httpRequest.params.userId);

            if (!isValidId) {
                return invalidIdResponse();
            }
            const getUserByIdUseCase = new GetUserByIdUseCase();

            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            );

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
