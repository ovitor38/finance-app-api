import { EmailAlreadyInUseError } from "../../errors/users.js";
import {
    checkIfEmailIsValid,
    emailIsAlreadyInUseResponse,
    ifPasswordIsValid,
    invalidPasswordResponse,
    badRequest,
    created,
    validateRequireFields,
    requeriedFieldsMissingResponse,
} from "../helpers/index.js";

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            const requiredFields = [
                "first_name",
                "last_name",
                "email",
                "password",
            ];

            const { ok: requeriedFieldsWereProvided, missingField } =
                validateRequireFields(params, requiredFields);

            if (!requeriedFieldsWereProvided) {
                if (!requeriedFieldsWereProvided) {
                    return requeriedFieldsMissingResponse(missingField);
                }
            }

            const passwordIsValid = ifPasswordIsValid(params.password);

            if (passwordIsValid) {
                return invalidPasswordResponse();
            }

            const emailIsValid = checkIfEmailIsValid(params.email);

            if (!emailIsValid) {
                return emailIsAlreadyInUseResponse();
            }

            const createdUser = await this.createUserUseCase.execute(params);

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
