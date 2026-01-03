import { ContaDomain } from "@domain/conta.domain";
import { ContaRepository } from "@domain/repositories/conta.repository";
import { ContaEntity } from "@infrastructure/entities/conta.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RepositoryPostgres } from "./repository.postgres";
import { Injectable } from "@nestjs/common";
import { Scope } from "@nestjs/common";
import { getCurrentMonthReference } from "@application/helpers/get-current-month-reference";

@Injectable({ scope: Scope.TRANSIENT })
export class ContaRepositoryPostgres extends RepositoryPostgres<ContaEntity, ContaDomain> implements ContaRepository {

    constructor(
        @InjectRepository(ContaEntity)
        private readonly repository: Repository<ContaEntity>,
      ) {
        super()
      }

    getRepository(): Repository<ContaEntity> {
        return this.repository;
    }

    async findAllByUsuarioId(
        usuarioId: number
    ): Promise<ContaDomain[]> {
        const mesReferencia = getCurrentMonthReference();
        const queryBuilder = this.repository.createQueryBuilder('conta')
            .leftJoinAndSelect('conta.usuario', 'usuario')
            .leftJoinAndSelect(
                'conta.orcamentos', 
                'orcamento',
                'orcamento.mesReferencia = :mesReferencia', { mesReferencia }
            )
            .leftJoinAndSelect(
                'conta.transacoes',
                'transacao',
                'transacao.mesReferencia = :mesReferencia', { mesReferencia }
            )
            .where('usuario.id = :usuarioId', { usuarioId })
            .orderBy({
                'orcamento.createdAt': 'DESC',
                'transacao.data': 'DESC',
            })
            .select([
                'conta.id', 'conta.nome', 'conta.saldoRealizado', 
                'conta.saldoPrevisto', 'conta.tipoConta', 'conta.createdAt', 'conta.updatedAt',
                'orcamento', 'transacao', 'usuario'
            ]);

        const contas = await queryBuilder.getMany();
        return contas.map(conta => conta.toDomain());
    }

    async findContaComUsuarioById(id: number): Promise<ContaDomain> {
          const conta = await this.repository.findOne({
              relations: ['usuario'],
              where: { id },
            });
          return conta?.toDomain();
    }

    async saveDomain(domain: ContaDomain): Promise<ContaDomain> {
        const contaEntity = ContaEntity.fromDomain(domain)
        return this.repository.save(contaEntity).then(contaEntity => contaEntity.toDomain());
    }

}