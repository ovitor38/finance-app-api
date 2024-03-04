import validator from "validator";
import {
    badRequest,
    checkIfIdIsValid,
    created,
    invalidIdResponse,
    requeriedFieldsMissingResponse,
    serverError,
    validateRequireFields,
} from "../helpers/index.js";

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            const requiredFields = [
                "user_id",
                "name",
                "date",
                "amount",
                "type",
            ];

            const { ok: requeriedFieldsWereProvided, missingField } =
                validateRequireFields(params, requiredFields);

            if (!requeriedFieldsWereProvided) {
                return requeriedFieldsMissingResponse(missingField);
            }

            const userIdIsValid = checkIfIdIsValid(params.user_id);

            if (!userIdIsValid) {
                return invalidIdResponse();
            }

            if (params.amount <= 0) {
                return badRequest({
                    message: "The amount must be granther than zero",
                });
            }
            const amountIsValid = validator.isCurrency(
                params.amount.toString(),
                {
                    digits_after_decimal: [2],
                    allow_negatives: false,
                    decimal_separator: ".",
                },
            );

            if (!amountIsValid) {
                return badRequest({
                    message: "amount must to be a valid currency",
                });
            }

            const type = params.type.trim().toUpperCase();

            const typeIsValid = ["EARNING", "EXPENSE", "INVESTIMENT"].includes(
                type,
            );

            if (!typeIsValid) {
                return badRequest({
                    message: "The type must be EARNING, EXPENSE or INVESTIMENT",
                });
            }

            const transaction = await this.createTransactionUseCase.execute({
                ...params,
                type,
            });

            return created(transaction);
        } catch (error) {
            console.log(error);
            return serverError();
        }
    }
}
