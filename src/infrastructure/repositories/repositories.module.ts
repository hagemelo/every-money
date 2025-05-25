import { Module } from '@nestjs/common';
import { UsuarioRepository } from '@domain/interfaces/usuario.repository';
import { UsuarioRepositoryPostgres } from './usuario.repository.postgres';
import { ContaRepository } from '@domain/interfaces/conta.repository';
import { ContaRepositoryPostgres } from './conta.repository.postgres';
import { CategoriaRepository } from '@domain/interfaces/categoria.repository';
import { CategoriaRepositoryPostgres } from './categoria.repository.postgres';
import { OrcamentoRepositoryPostgres } from './orcamento.repository.postgres';
import { OrcamentoRepository } from '@domain/interfaces/orcamento.repository';
import { TransacaoRepository } from '@domain/interfaces/transacao.repository';
import { TransacaoRepositoryPostgres } from './transacao.repository.postgres';


@Module({
  
  providers: [
    {provide: UsuarioRepository, useClass: UsuarioRepositoryPostgres}, 
    {provide: ContaRepository, useClass: ContaRepositoryPostgres},
    {provide: CategoriaRepository, useClass: CategoriaRepositoryPostgres},
    {provide: OrcamentoRepository, useClass: OrcamentoRepositoryPostgres},
    {provide: TransacaoRepository, useClass: TransacaoRepositoryPostgres}
  ],
  exports: [UsuarioRepository, ContaRepository, CategoriaRepository, OrcamentoRepository, TransacaoRepository],
})
export class RepositoriesModule {}
