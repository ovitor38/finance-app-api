import { ZodError } from "zod";
import { EmailAlreadyInUseError } from "../../errors/users.js";
import { updateUserSchema } from "../../schemas/user.js";
import {
    checkIfIdIsValid,
    invalidIdResponse,
    badRequest,
    ok,
    serverError,
} from "../helpers/index.js";

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;

            const isValidId = checkIfIdIsValid(userId);

            if (!isValidId) {
                return invalidIdResponse();
            }
            const params = httpRequest.body;

            await updateUserSchema.parse(params);

            const updatedUser = await this.updateUserUseCase.execute(
                userId,
                params,
            );

            return ok(updatedUser);
        } catch (error) {
            console.log(error);

            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message });
            }

            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }
            return serverError();
        }
    }
}
