import { Module } from '@nestjs/common';
import { UsuarioRepository } from '@domain/interfaces/usuario.repository';
import { UsuarioRepositoryPostgres } from './usuario.repository.postgres';
import { ContaRepository } from '@domain/interfaces/conta.repository';
import { ContaRepositoryPostgres } from './conta.repository.postgres';
import { CategoriaRepository } from '@domain/interfaces/categoria.repository';
import { CategoriaRepositoryPostgres } from './categoria.repository.postgres';



@Module({
  
  providers: [
    {provide: UsuarioRepository, useClass: UsuarioRepositoryPostgres}, 
    {provide: ContaRepository, useClass: ContaRepositoryPostgres},
    {provide: CategoriaRepository, useClass: CategoriaRepositoryPostgres}
  ],
  exports: [UsuarioRepository, ContaRepository, CategoriaRepository],
})
export class RepositoriesModule {}
