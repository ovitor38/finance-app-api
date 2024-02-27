import { UpdateUserUseCase } from "../use-cases/update-user.js";
import { EmailAlreadyInUseError } from "../errors/users.js";
import {
    checkIfEmailIsValid,
    checkIfIdIsValid,
    emailIsAlreadyInUseResponse,
    ifPasswordIsValid,
    invalidIdResponse,
    invalidPasswordResponse,
    badRequest,
    ok,
    serverError,
} from "./helpers/index.js";

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;

            const isValidId = checkIfIdIsValid();

            if (!isValidId) {
                return invalidIdResponse();
            }
            const updateUserParams = httpRequest.body;

            const allowedFields = [
                "first_name",
                "last_name",
                "email",
                "password",
            ];

            const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field),
            );

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: "some provided field is not allowed",
                });
            }

            const passwordIsValid = ifPasswordIsValid(updateUserParams);

            if (passwordIsValid) {
                return invalidPasswordResponse();
            }

            const emailIsValid = checkIfEmailIsValid(updateUserParams);

            if (!emailIsValid) {
                return emailIsAlreadyInUseResponse();
            }

            const updateUserUseCase = new UpdateUserUseCase();

            const updatedUser = await updateUserUseCase.execute(
                userId,
                updateUserParams,
            );

            return ok(updatedUser);
        } catch (error) {
            console.log(error);
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }
            return serverError();
        }
    }
}
