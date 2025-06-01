import { ContaDomain } from "@domain/conta.domain";
import { ContaRepository } from "@domain/interfaces/conta.repository";
import { UsuarioRepository } from "@domain/interfaces/usuario.repository";
import { UsuarioDomain } from "@domain/usuario.domain";
import { ContaEntity } from "@infrastructure/entities/conta.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RepositoryPostgres } from "./repository.postgres";
import { Injectable } from "@nestjs/common";
import { Scope } from "@nestjs/common";

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

    async findAllByUsuarioId(usuarioId: number): Promise<ContaDomain[]> {
        const contas = await this.repository.find({
            relations: ['orcamentos', 'transacoes', 'usuario'],
            where: { usuario: { id: usuarioId } },
            select: ['id', 'nome', 'saldoRealizado', 'saldoPrevisto', 'tipoConta', 'createdAt', 'updatedAt']
          });
        return contas.map(conta => conta.toDomain());
    }

    async saveDomain(domain: ContaDomain): Promise<ContaDomain> {
        const contaEntity = ContaEntity.fromDomain(domain)
        return this.repository.save(contaEntity).then(contaEntity => contaEntity.toDomain());
    }

}