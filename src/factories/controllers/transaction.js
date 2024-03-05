import {
    CreateTransactionController,
    GetTransactionsByUserIdController,
} from "../../controllers/transactions/index.js";
import {
    PostgresCreateTransaction,
    PostgresGetTransactionsByUserId,
} from "../../repositories/postgres/transactions/index.js";
import { PostgresGetUserByIdRepository } from "../../repositories/postgres/users/index.js";
import {
    CreateTransactionUseCase,
    GetTransactionsByUserIdUseCase,
} from "../../use-cases/transactions/index.js";

export const makeCreateTransactionController = () => {
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

export const makeGetTransactionsByUserIdController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();
    const getTransactionByUserIdRepository =
        new PostgresGetTransactionsByUserId();

    const getTransactionByUserIdUseCase = new GetTransactionsByUserIdUseCase(
        getUserByIdRepository,
        getTransactionByUserIdRepository,
    );

    const getTransactionByUserIdController =
        new GetTransactionsByUserIdController(getTransactionByUserIdUseCase);

    return getTransactionByUserIdController;
};
