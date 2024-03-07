import { checkIfIdIsValid, invalidIdResponse, ok } from "../helpers/index.js";

export class GetUserBalanceController {
    constructor(getUSerBalanceUseCase) {
        this.getUSerBalanceUseCase = getUSerBalanceUseCase;
    }

    async execute(httpRequest) {
        const isValidId = checkIfIdIsValid(httpRequest.params.userId);

        if (!isValidId) {
            return invalidIdResponse();
        }

        const balance = await this.getUSerBalanceUseCase.execute(
            httpRequest.params.userId,
        );

        return ok(balance);
    }
}
