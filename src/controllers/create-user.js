import validator from "validator";
import { CreateUserUseCase } from "../use-cases/create-users.js";
import { badRequest, created } from "./helpers.js";
import { EmailAlreadyInUseError } from "../errors/users.js";

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            const requiredFields = [
                "first_name",
                "last_name",
                "email",
                "password",
            ];

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    badRequest({ message: `Missing param ${field}` });
                }
            }

            if (params.password.length < 6) {
                return badRequest({
                    message: "Password must be least 6 chacteres",
                });
            }

            const emailIsValid = validator.isEmail(params.email);

            if (!emailIsValid) {
                return badRequest({ message: "The email is invalid" });
            }

            const createUserUseCase = new CreateUserUseCase();
            const createdUser = await createUserUseCase.execute(params);

            return created(createdUser);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }
            console.log(error);
            return {
                statusCode: 500,
                body: {
                    errorMessage: "Internal server error",
                },
            };
        }
    }
}
