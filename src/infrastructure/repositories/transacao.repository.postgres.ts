import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RepositoryPostgres } from "./repository.postgres";
import { TransacaoDomain } from "@domain/transacao.domain";
import { TransacaoRepository } from "@domain/interfaces/transacao.repository";
import { TransacaoEntity } from "@infrastructure/entities/transacao.entity";
import { Injectable } from "@nestjs/common";
import { Scope } from "@nestjs/common";


@Injectable({ scope: Scope.TRANSIENT })
export class TransacaoRepositoryPostgres extends RepositoryPostgres<TransacaoEntity, TransacaoDomain> implements TransacaoRepository {

    constructor(
        @InjectRepository(TransacaoEntity)
        private readonly repository: Repository<TransacaoEntity>,
      ) {
        super()
      }

    getRepository(): Repository<TransacaoEntity> {
        return this.repository;
    }

    
    async saveDomain(domain: TransacaoDomain): Promise<TransacaoDomain> {
        const transacaoEntity = TransacaoEntity.fromDomain(domain)
        return this.repository.save(transacaoEntity).then(transacaoEntity => transacaoEntity.toDomain());
    }

}