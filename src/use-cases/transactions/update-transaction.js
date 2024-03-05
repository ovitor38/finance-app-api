export class UpadateTransactionUseCase {
    constructor(updateTransanctionRepository) {
        this.updateTransanctionRepository = updateTransanctionRepository;
    }

    async execute(transactionId, params) {
        const transaction = await this.updateTransanctionRepository.execute(
            transactionId,
            params,
        );

        return transaction;
    }
}
