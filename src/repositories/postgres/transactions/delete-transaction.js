import { PostgresHelper } from "../../../db/postgres/migrations.js";

export class PostgresDeleteRepository {
    async execute(trasactionId) {
        const deletedTransaction = await PostgresHelper.query(
            `
        DELETE FROM trasactions 
        WHERE id = $1 
        RETURNING *`,
            [trasactionId],
        );

        return deletedTransaction[0];
    }
}
