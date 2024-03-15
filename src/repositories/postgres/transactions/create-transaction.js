import { prisma } from "../../../../prisma/prisma.js";

export class PostgresCreateTransaction {
    async execute(createTrasactionParams) {
        return await prisma.transaction.create({
            data: createTrasactionParams,
        });
    }
}
