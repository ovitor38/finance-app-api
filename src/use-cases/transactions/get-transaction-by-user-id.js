import { UserNotFoundError } from "../../errors/users";

export class GetTransactionsByUserIdUseCase {
    constructor(getUserByIdRepository, getTransactionsByUserIdRepository) {
        this.getUserByIdRepository = getUserByIdRepository;
        this.getTransactionsByUserIdRepository =
            getTransactionsByUserIdRepository;
    }

    async execute(params) {
        const user = await this.getUserByIdRepository(params.userId);

        if (!user) {
            throw new UserNotFoundError(params.userId);
        }

        const transactions = await this.getTransactionsByUserIdRepository(
            params.userId,
        );

        return transactions;
    }
}
