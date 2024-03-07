import { UserNotFoundError } from "../../errors/users";

export class GetUserBalanceUseCase {
    constructor(getUserBalanceRepository, getUserByIdRepository) {
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
