import { UserNotFoundError } from "../../errors/users";

export class GetUserByIdUseCase {
    constructor(getUserByIdRepository) {
        this.getUserByIdRepository = getUserByIdRepository;
    }
    async execute(userId) {
        const user = await this.getUserByIdRepository.execute(userId);

        if (!user) {
            throw new UserNotFoundError();
        }

        return user;
    }
}
