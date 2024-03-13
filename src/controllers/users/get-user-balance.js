import { UserNotFoundError } from "../../errors/users.js";
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    userNotFoundResponse,
} from "../helpers/index.js";

export class GetUserBalanceController {
    constructor(getUSerBalanceUseCase) {
        this.getUSerBalanceUseCase = getUSerBalanceUseCase;
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;

            const isValidId = checkIfIdIsValid(userId);

            if (!isValidId) {
                return invalidIdResponse();
            }

            const balance = await this.getUSerBalanceUseCase.execute({
                userId,
            });

            return ok(balance);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse();
            }
            console.log(error);

            return serverError();
        }
    }
}
