import {
    checkIfIdIsValid,
    invalidIdResponse,
    serverError,
    transactionNotFoundResponse,
} from "../helpers/index.js";

export class DeleteTransactionController {
    constructor(deleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase;
    }

    async execute(httpRequest) {
        try {
            const idValid = checkIfIdIsValid(httpRequest.params.transactionId);

            if (!idValid) {
                return invalidIdResponse();
            }

            const deletedTransaction =
                await this.deleteTransactionUseCase.execute(
                    httpRequest.params.transactionId,
                );

            if (!deletedTransaction) {
                return transactionNotFoundResponse;
            }

            return deletedTransaction;
        } catch (error) {
            console.log(error);
            return serverError();
        }
    }
}
