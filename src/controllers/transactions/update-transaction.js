import {
    badRequest,
    checkIfAmountIsValid,
    checkIfIdIsValid,
    checkIfTypeIsValid,
    invalidAmountResponse,
    invalidIdResponse,
    invalidTypeResponse,
    ok,
    serverError,
} from "../helpers/index.js";

export class UpdateTransanctionController {
    constructor(updateTransanctionUseCase) {
        this.updateTransanctionUseCase = updateTransanctionUseCase;
    }

    async execute(httpRequest) {
        try {
            const idValid = checkIfIdIsValid(httpRequest.params.transactionId);

            if (!idValid) {
                return invalidIdResponse();
            }

            const params = httpRequest.body;

            const allowedFields = ["name", "date", "amount", "type"];

            const someFieldsIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            );

            if (someFieldsIsNotAllowed) {
                return badRequest({ message: "Some fields is not allowed" });
            }

            if (params.amount) {
                const amountIsValid = checkIfAmountIsValid(params.amount);

                if (!amountIsValid) {
                    return invalidAmountResponse();
                }
            }

            if (params.type) {
                const typeIsValid = checkIfTypeIsValid(params.type);

                if (!typeIsValid) {
                    return invalidTypeResponse();
                }
            }

            const transaction = await this.updateTransanctionUseCase.execute(
                httpRequest.params.transactionId,
                params,
            );

            return ok(transaction);
        } catch (error) {
            console.log(error);
            return serverError();
        }
    }
}
