import "dotenv/config.js";
import express from "express";

import {
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserByIdController,
    makeUpdateUserController,
} from "./src/factories/controllers/user.js";
import {
    makeCreateTransactionController,
    makeDeleteTransactionController,
    makeGetTransactionsByUserIdController,
    makeGetUserBalanceController,
    makeUpdateTransactionController,
} from "./src/factories/controllers/transaction.js";

const app = express();
app.use(express.json());

app.get("/api/users/:userId", async (req, res) => {
    const getUserByIdController = makeGetUserByIdController();

    const { statusCode, body } = await getUserByIdController.execute(req);

    res.status(statusCode).send(body);
});

app.get("/api/users/:userId/balance", async (req, res) => {
    const getUserBalanceController = makeGetUserBalanceController();

    const { statusCode, body } = await getUserBalanceController.execute(req);

    res.status(statusCode).send(body);
});

app.post("/api/users", async (req, res) => {
    const createUserController = makeCreateUserController();

    const { statusCode, body } = await createUserController.execute(req);

    res.status(statusCode).send(body);
});

app.patch("/api/users/:userId", async (req, res) => {
    const updateUserController = makeUpdateUserController();

    const { statusCode, body } = await updateUserController.execute(req);

    res.status(statusCode).send(body);
});

app.delete("/api/users/:userId", async (req, res) => {
    const deleteUserController = makeDeleteUserController();

    const { statusCode, body } = await deleteUserController.execute(req);

    res.status(statusCode).send(body);
});

app.post("/api/transactions", async (req, res) => {
    const createTransactionController = makeCreateTransactionController();

    const { statusCode, body } = await createTransactionController.execute(req);

    res.status(statusCode).send(body);
});

app.get("/api/transactions", async (req, res) => {
    const getTransactionByUserIdController =
        makeGetTransactionsByUserIdController();
    const { statusCode, body } =
        await getTransactionByUserIdController.execute(req);

    res.status(statusCode).send(body);
});

app.patch("/api/transactions/:transactionId", async (req, res) => {
    const updateTransactionController = makeUpdateTransactionController();

    const { statusCode, body } = await updateTransactionController.execute(req);

    res.status(statusCode).send(body);
});

app.delete("/api/transactions/:transactionId", async (req, res) => {
    const deleteTransactionController = makeDeleteTransactionController();

    const { statusCode, body } = await deleteTransactionController.execute(req);

    res.status(statusCode).send(body);
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
});
