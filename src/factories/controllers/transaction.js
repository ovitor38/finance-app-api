import {
    CreateTransactionController,
    GetTransactionsByUserIdController,
    UpdateTransanctionController,
} from "../../controllers/transactions/index.js";
import {
    PostgresCreateTransaction,
    PostgresGetTransactionsByUserId,
    PostgresUpdateTransactionRepository,
} from "../../repositories/postgres/transactions/index.js";
import { PostgresGetUserByIdRepository } from "../../repositories/postgres/users/index.js";
import {
    CreateTransactionUseCase,
    GetTransactionsByUserIdUseCase,
    UpadateTransactionUseCase,
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

export const makeUpdateTransactionController = () => {
    const updateTransactionRepository =
        new PostgresUpdateTransactionRepository();

    const updateTransactionUseCase = new UpadateTransactionUseCase(
        updateTransactionRepository,
    );

    const updateTransactionController = new UpdateTransanctionController(
        updateTransactionUseCase,
    );

    return updateTransactionController;
};
