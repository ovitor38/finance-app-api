import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import {
    checkIfIdIsValid,
    invalidIdResponse,
    notFound,
    ok,
    serverError,
} from "./helpers/index.js";

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isValidId = checkIfIdIsValid();

            if (!isValidId) {
                return invalidIdResponse();
            }
            const getUserByIdUseCase = new GetUserByIdUseCase();

            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            );

            if (!user) {
                return notFound({ message: "User not found" });
            }

            return ok(user);
        } catch (error) {
            console.log(error);
            serverError;
        }
    }
}
