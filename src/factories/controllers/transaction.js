import {
    CreateTransactionController,
    DeleteTransactionController,
    GetTransactionsByUserIdController,
    UpdateTransanctionController,
} from "../../controllers/transactions/index.js";
import { GetUserBalanceController } from "../../controllers/users/get-user-balance.js";
import {
    PostgresCreateTransaction,
    PostgresDeleteTransactionRepository,
    PostgresGetTransactionsByUserId,
    PostgresUpdateTransactionRepository,
} from "../../repositories/postgres/transactions/index.js";
import {
    PostgresGetUserBalanceRepository,
    PostgresGetUserByIdRepository,
} from "../../repositories/postgres/users/index.js";
import {
    CreateTransactionUseCase,
    DeleteTransactionUseCase,
    GetTransactionsByUserIdUseCase,
    UpadateTransactionUseCase,
} from "../../use-cases/transactions/index.js";
import { GetUserBalanceUseCase } from "../../use-cases/users/get-user-balance-use-case.js";

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

export const makeDeleteTransactionController = () => {
    const deleteTransactionRepository =
        new PostgresDeleteTransactionRepository();

    const deleteTransactionUseCase = new DeleteTransactionUseCase(
        deleteTransactionRepository,
    );

    const deleteTransactionController = new DeleteTransactionController(
        deleteTransactionUseCase,
    );

    return deleteTransactionController;
};

export const makeGetUserBalanceController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const getUserBalanceRepository = new PostgresGetUserBalanceRepository();

    const getUserBalanceUseCase = new GetUserBalanceUseCase(
        getUserByIdRepository,
        getUserBalanceRepository,
    );

    const getUserBalanceController = new GetUserBalanceController(
        getUserBalanceUseCase,
    );

    return getUserBalanceController;
};
