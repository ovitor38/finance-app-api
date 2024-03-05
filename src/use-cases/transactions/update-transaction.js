import { UserNotFoundError } from "../../errors/users";

export class UpadateTransactionUseCase {
    constructor(getUserByIdRepository, updateTransanctionRepository) {
        this.getUserByIdRepository = getUserByIdRepository;
        this.updateTransanctionRepository = updateTransanctionRepository;
    }

    async execute(params) {
        const user = await this.getUserByIdRepository.execute(params.userId);

        if (!user) {
            throw new UserNotFoundError();
        }

        const transaction =
            await this.updateTransanctionRepository.execute(params);

        return transaction;
    }
}
