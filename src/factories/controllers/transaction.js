import { CreateTransactionController } from "../../controllers/transactions/create-transaction.js";
import { PostgresCreateTransaction } from "../../repositories/postgres/transactions/index.js";
import { PostgresGetUserByIdRepository } from "../../repositories/postgres/users/index.js";
import { CreateTransactionUseCase } from "../../use-cases/transactions/index.js";

export const makeTransactionController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();
    const createTransactionRepository = new PostgresCreateTransaction();

    const createTransactionUseCase = new CreateTransactionUseCase(
        getUserByIdRepository,
        createTransactionRepository,
    );

    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    );

    return createTransactionController;
};
