import { UserNotFoundError } from "../../errors/users";
import { ok } from "../helpers/http";
import { userNotFoundResponse } from "../helpers/users";
import {
    checkIfIdIsValid,
    invalidIdResponse,
    requeriedFieldsMissingResponse,
} from "../helpers/validation";

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

            const transactions = await this.getTransactionsByUserIdUseCase({
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
