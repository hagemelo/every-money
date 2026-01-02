import { OrcamentoDomain } from "@domain/orcamento.domain";
import { OrcamentoRepository } from "@domain/repositories/orcamento.repository";
import { Inject, Injectable } from "@nestjs/common";


@Injectable()
export class ListAllBudgetByUserIdUseCase {

    constructor(
        @Inject(OrcamentoRepository) private readonly repository: OrcamentoRepository
    ) {}

    async execute(userId: number): Promise<OrcamentoDomain[]> {

        const orcamentos = await this.repository.findAllByUsuarioId(userId);
        return orcamentos ?? [];
    }
}