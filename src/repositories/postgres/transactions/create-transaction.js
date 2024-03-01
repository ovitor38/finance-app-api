import { PostgresHelper } from "../../../db/postgres/helper";

export class PostgresCreateTransaction {
    async execute(createTrasactionParams) {
        const createdTransaction = await PostgresHelper.query(
            `
        INSERT INTO transactions (id, user_id, name, date, amount, type)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `,
            [
                createTrasactionParams.id,
                createTrasactionParams.user_id,
                createTrasactionParams.name,
                createTrasactionParams.date,
                createTrasactionParams.amount,
                createTrasactionParams.type,
            ],
        );
        return createdTransaction[0];
    }
}
