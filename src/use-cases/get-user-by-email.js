import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email.js";

export class GetUserByEmailUseCase {
    async execute(userId) {
        const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

        const user = await getUserByEmailRepository.execute(userId);

        return user;
    }
}
