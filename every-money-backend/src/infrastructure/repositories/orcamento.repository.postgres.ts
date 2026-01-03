import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RepositoryPostgres } from "./repository.postgres";
import { OrcamentoEntity } from "@infrastructure/entities/orcamento.entity";
import { OrcamentoDomain } from "@domain/orcamento.domain";
import { FindAllByUsuarioIdParams, OrcamentoRepository } from "@domain/repositories/orcamento.repository";
import { Injectable } from "@nestjs/common";
import { Scope } from "@nestjs/common";

const LIMIT = 50
const OFFSET = 0

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

    async findAllByUsuarioId(params: FindAllByUsuarioIdParams): Promise<OrcamentoDomain[]> {

      const { usuarioId, limit = LIMIT, offset = OFFSET } = params;
      const orcamentos = await this.repository.find({
            relations: ['conta'],
            where: { conta: { usuario: { id: usuarioId } } },
            select: ['id', 'mesReferencia', 'limite', 'tipoCategoria', 'createdAt', 'updatedAt',  'conta'],
            order: { createdAt: 'DESC', mesReferencia: 'ASC' },
            take: limit,
            skip: offset
          });
      return orcamentos.map(orcamento => orcamento.toDomain());
    }

}