import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RepositoryPostgres } from "./repository.postgres";
import { OrcamentoEntity } from "@infrastructure/entities/orcamento.entity";
import { OrcamentoDomain } from "@domain/orcamento.domain";
import { OrcamentoRepository } from "@domain/repositories/orcamento.repository";
import { Injectable } from "@nestjs/common";
import { Scope } from "@nestjs/common";

@Injectable({ scope: Scope.TRANSIENT })
export class OrcamentoRepositoryPostgres extends RepositoryPostgres<OrcamentoEntity, OrcamentoDomain> implements OrcamentoRepository {

    constructor(
        @InjectRepository(OrcamentoEntity)
        private readonly repository: Repository<OrcamentoEntity>,
      ) {
        super()
      }

    getRepository(): Repository<OrcamentoEntity> {
        return this.repository;
    }

    async saveDomain(domain: OrcamentoDomain): Promise<OrcamentoDomain> {
       const orcamentoEntity = OrcamentoEntity.fromDomain(domain)
       return this.repository.save(orcamentoEntity).then(orcamentoEntity => orcamentoEntity.toDomain());
    }

    async findAllByUsuarioId(usuarioId: number): Promise<OrcamentoDomain[]> {
      const orcamentos = await this.repository.find({
            relations: ['conta'],
            where: { conta: { usuario: { id: usuarioId } } },
            select: ['id', 'mesReferencia', 'limite', 'tipoCategoria', 'createdAt', 'updatedAt',  'conta']
          });
      return orcamentos.map(orcamento => orcamento.toDomain());
    }

}