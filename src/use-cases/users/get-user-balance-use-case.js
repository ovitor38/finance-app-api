import { UserNotFoundError } from "../../errors/users.js";

export class GetUserBalanceUseCase {
    constructor(getUserByIdRepository, getUserBalanceRepository) {
        this.getUserByIdRepository = getUserByIdRepository;
        this.getUserBalanceRepository = getUserBalanceRepository;
    }

    async execute(params) {
        const user = await this.getUserByIdRepository.execute(params.userId);

        if (!user) {
            throw new UserNotFoundError();
        }

        const balance = await this.getUserBalanceRepository.execute(
            params.userId,
        );

        return balance;
    }
}
