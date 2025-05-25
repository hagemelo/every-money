import { CategoriaDomain } from "@domain/categoria.domain";
import { CategoriaEntity } from "@infrastructure/entities/categoria.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RepositoryPostgres } from "./repository.postgres";
import { OrcamentoEntity } from "@infrastructure/entities/orcamento.entity";
import { OrcamentoDomain } from "@domain/orcamento.domain";
import { OrcamentoRepository } from "@domain/interfaces/orcamento.repository";



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

    
    async save(entity: OrcamentoDomain): Promise<OrcamentoDomain> {
        const orcamentoEntity = OrcamentoEntity.fromDomain(entity)
        return this.repository.save(orcamentoEntity).then(orcamentoEntity => orcamentoEntity.toDomain());
    }

}