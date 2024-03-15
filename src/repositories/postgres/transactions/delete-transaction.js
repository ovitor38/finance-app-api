import { prisma } from "../../../../prisma/prisma.js";

export class PostgresDeleteTransactionRepository {
    async execute(trasactionId) {
        try {
            return await prisma.transaction.delete({
                where: { id: trasactionId },
            });
        } catch (error) {
            return null;
        }
    }
}
