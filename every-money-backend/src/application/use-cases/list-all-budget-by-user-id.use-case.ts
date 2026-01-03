import { OrcamentoDomain } from "@domain/orcamento.domain";
import { FindAllByUsuarioIdParams, OrcamentoRepository } from "@domain/repositories/orcamento.repository";
import { Inject, Injectable } from "@nestjs/common";



@Injectable()
export class ListAllBudgetByUserIdUseCase {

    constructor(
        @Inject(OrcamentoRepository) private readonly repository: OrcamentoRepository
    ) {}

    async execute(params: FindAllByUsuarioIdParams): Promise<OrcamentoDomain[]> {

        const orcamentos = await this.repository.findAllByUsuarioId(params);
        return orcamentos ?? [];
    }
}