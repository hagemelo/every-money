import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RepositoryPostgres } from "./repository.postgres";
import { TransacaoDomain } from "@domain/transacao.domain";
import { FindAllByContaIdAndMonthAndYearProps, TransacaoRepository } from "@domain/repositories/transacao.repository";
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

    async findAllByContaId(contaId: number): Promise<TransacaoDomain[]> {
      const transacoes = await this.repository.find({
            relations: ['conta', 'categoria'],
            where: { conta: { id: contaId } },
            select: ['id', 'descricao', 'data', 'valor', 'tipo', 'status', 'createdAt', 'updatedAt', 'categoria', 'conta'],
            order: {
                data: 'DESC'
            }
          });
      return transacoes.map(transacao => transacao.toDomain());
    }

    async findAllByContaIdAndMonthAndYear(props: FindAllByContaIdAndMonthAndYearProps): Promise<TransacaoDomain[]>{

      const {accountId, month, year} = props
      const queryBuilder = this.repository
        .createQueryBuilder('transacao')
        .leftJoinAndSelect('transacao.conta', 'conta')
        .leftJoinAndSelect('transacao.categoria', 'categoria')
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