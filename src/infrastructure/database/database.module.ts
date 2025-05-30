import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'


import { CategoriaEntity } from '@infrastructure/entities/categoria.entity'
import { ContaEntity } from '@infrastructure/entities/conta.entity'
import { OrcamentoEntity } from '@infrastructure/entities/orcamento.entity'
import { TransacaoEntity } from '@infrastructure/entities/transacao.entity'
import { UsuarioEntity } from '@infrastructure/entities/usuario.entity'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { join } from 'path';
import { addTransactionalDataSource } from 'typeorm-transactional'
import { DataSource } from 'typeorm'


@Global()
@Module({
    imports: [
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('database.host') || 'localhost',
            port: +configService.get('database.port') || 1234,
            username: configService.get('database.username') || 'teste',
            password: configService.get('database.password') || 'teste',
            database: configService.get('database.database') || 'teste',
            entities: [join(__dirname, '../entities/*.entity.{ts,js}')],
            synchronize: true,
            logging: true,
          }),
        inject: [ConfigService],

        async dataSourceFactory(options) {
          if (!options) {
            throw new Error('Invalid options passed');
          }
  
          return addTransactionalDataSource(new DataSource(options));
        },
      }),
        TypeOrmModule.forFeature([CategoriaEntity , ContaEntity, OrcamentoEntity, TransacaoEntity, UsuarioEntity]),
      ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}