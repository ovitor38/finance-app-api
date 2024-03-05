import { UserNotFoundError } from "../../errors/users.js";
import { ok } from "../helpers/http.js";
import { userNotFoundResponse } from "../helpers/users.js";
import {
    checkIfIdIsValid,
    invalidIdResponse,
    requeriedFieldsMissingResponse,
} from "../helpers/validation.js";

export class GetTransactionsByUserIdController {
    constructor(getTransactionsByUserIdUseCase) {
        this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase;
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId;

            if (!userId) {
                return requeriedFieldsMissingResponse("userId");
            }

            const userIdIsValid = checkIfIdIsValid(userId);

            if (!userIdIsValid) {
                return invalidIdResponse();
            }

            const transactions =
                await this.getTransactionsByUserIdUseCase.execute({
                    userId,
                });

            return ok(transactions);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse();
            }
        }
    }
}
