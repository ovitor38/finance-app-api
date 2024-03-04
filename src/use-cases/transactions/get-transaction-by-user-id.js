import { userNotFoundResponse } from "../../controllers/helpers";

export class GetTransactionsByUserId {
    constructor(getUserByIdRepository, getTransactionsByUserIdRepository) {
        this.getUserByIdRepository = getUserByIdRepository;
        this.getTransactionsByUserIdRepository =
            getTransactionsByUserIdRepository;
    }

    async execute(params) {
        const user = await this.getUserByIdRepository(params.userId);

        if (!user) {
            return userNotFoundResponse();
        }

        const transactions = await this.getTransactionsByUserIdRepository(
            params.userId,
        );

        return transactions;
    }
}
