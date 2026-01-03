import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RepositoryPostgres } from "./repository.postgres";
import { TransacaoDomain } from "@domain/transacao.domain";
import { FindAllByContaIdAndMonthAndYearParams, FindAllByContaIdParams, TransacaoRepository } from "@domain/repositories/transacao.repository";
import { TransacaoEntity } from "@infrastructure/entities/transacao.entity";
import { Injectable } from "@nestjs/common";
import { Scope } from "@nestjs/common";

const LIMIT = 50
const OFFSET = 0

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

    async findAllByContaId(params: FindAllByContaIdParams): Promise<TransacaoDomain[]> {

      const {accountId, limit = LIMIT, offset = OFFSET} = params
      const transacoes = await this.repository.find({
            relations: ['conta', 'categoria'],
            where: { conta: { id: accountId } },
            select: ['id', 'descricao', 'data', 'valor', 'tipo', 'status', 'createdAt', 'updatedAt', 'categoria', 'conta'],
            order: {
                data: 'DESC'
            },
            skip: offset,
            take: limit
          });
      return transacoes.map(transacao => transacao.toDomain());
    }

    async findAllByContaIdAndMonthAndYear(params: FindAllByContaIdAndMonthAndYearParams): Promise<TransacaoDomain[]>{

      const {accountId, month, year, limit = LIMIT, offset = OFFSET} = params
      const queryBuilder = this.repository
        .createQueryBuilder('transacao')
        .leftJoinAndSelect('transacao.conta', 'conta')
        .leftJoinAndSelect('transacao.categoria', 'categoria')
        .skip(offset)
        .take(limit)
        .where('conta.id = :accountId', { accountId });
      if (month !== undefined) {
          queryBuilder.andWhere('EXTRACT(MONTH FROM transacao.data) = :month', { month });
      }
      
      if (year !== undefined) {
          queryBuilder.andWhere('EXTRACT(YEAR FROM transacao.data) = :year', { year });
      }
      const transacoes = await queryBuilder
          .orderBy('transacao.data', 'DESC')
          .getMany();
      return transacoes.map(transacao => transacao.toDomain());
    }
}