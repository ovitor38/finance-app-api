import { PostgresHelper } from "../../../db/postgres/helper.js";

export class PostgresDeleteTransactionRepository {
    async execute(trasactionId) {
        const deletedTransaction = await PostgresHelper.query(
            `
        DELETE FROM transactions 
        WHERE id = $1 
        RETURNING *`,
            [trasactionId],
        );

        return deletedTransaction[0];
    }
}
