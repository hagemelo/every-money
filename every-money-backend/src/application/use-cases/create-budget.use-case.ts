import { ContaRepository } from "@domain/repositories/conta.repository";
import { Inject, Injectable, NotAcceptableException, Scope, UnauthorizedException } from "@nestjs/common";
import { OrcamentoRepository } from "@domain/repositories/orcamento.repository";
import { Transactional } from "typeorm-transactional";
import { OrcamentoDomain } from "@domain/orcamento.domain";
import { OrcamentoModel } from "@domain/models/orcamento.model";


@Injectable({ scope: Scope.TRANSIENT })
export class CreateBudgetUseCase {

    constructor(
        @Inject(ContaRepository) private readonly contaRepository: ContaRepository,
        @Inject(OrcamentoRepository) private readonly orcamentoRepository: OrcamentoRepository
    ) {}

    @Transactional()
    async execute(orcamento: OrcamentoModel, contaId: number): Promise<OrcamentoDomain> {
        const conta = await this.contaRepository.findById({id: contaId});
        if (!conta) {
            throw new UnauthorizedException('Conta nao encontrada');
        }
        const newOrcamento = new OrcamentoDomain({...orcamento, mesReferencia: undefined});
        newOrcamento.addConta(conta.toDomain());
        await this.checkOrcamentoData(newOrcamento)
        const resultNewOrcamento = await this.orcamentoRepository.saveDomain(newOrcamento);
        if (!resultNewOrcamento) {
            throw new Error('Erro ao criar orcamento');
        }
        return resultNewOrcamento;
    }

    private async checkOrcamentoData (orcamento: OrcamentoDomain): Promise<void>{
        
        const alreadyExistOrcamentoToMesrefenciaAndTipoCategoria = await this.orcamentoRepository.lookupByMesReferenciaAndTipoCategoriaAndContaId({
            mesReferencia: orcamento.mesReferencia,
            tipoCategoria: orcamento.tipoCategoria,
            contaId: orcamento.conta.id
        });

        if (alreadyExistOrcamentoToMesrefenciaAndTipoCategoria.length > 0) {
            throw new NotAcceptableException('Já existe um orçamento para este mês e categoria');
        }
    }
}