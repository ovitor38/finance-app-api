import validator from "validator";
import { badRequest, ok, serverError } from "./helpers.js";
import { UpdateUserUseCase } from "../use-cases/update-user.js";
import { EmailAlreadyInUseError } from "../errors/users.js";

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;
            if (!validator.isUUID(userId)) {
                return badRequest({ message: "Provdided id is not valid." });
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

            if (updateUserParams.password) {
                if (updateUserParams.password.length < 6) {
                    return badRequest({
                        message: "Password must be least 6 chacteres",
                    });
                }
            }

            if (updateUserParams.email) {
                const emailIsValid = validator.isEmail(updateUserParams.email);

                if (!emailIsValid) {
                    return badRequest({ message: "The email is invalid" });
                }
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
