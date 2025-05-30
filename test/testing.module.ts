import { createPostgresDataSourceTest } from '@infrastructure/database/data-source/postgres-test'
import { DatabaseModule } from '@infrastructure/database/database.module'
import { CategoriaFixture } from '@infrastructure/database/fixtures/categoria.fixture'
import { ContaFixture } from '@infrastructure/database/fixtures/conta.fixture'
import { OrcamentoFixture } from '@infrastructure/database/fixtures/orcamento.fixture'
import { TransacaoFixture } from '@infrastructure/database/fixtures/transacao.fixture'
import { UsuarioFixture } from '@infrastructure/database/fixtures/usuario.fixture'
import { ConfigModule } from '@nestjs/config'
import { Test, type TestingModule } from '@nestjs/testing'
import { EveryMoneyModule } from 'src/every-money.module'
import { DataSource } from 'typeorm'
import { addTransactionalDataSource } from 'typeorm-transactional'

let testingModule: TestingModule

export const buildTestingModule = async (): Promise<TestingModule> => {
    const dataSource = addTransactionalDataSource(await createPostgresDataSourceTest())

    testingModule = await Test.createTestingModule({
        imports: [
            ConfigModule.forRoot({
              load: [],
              isGlobal: true
            }),
            DatabaseModule,
            EveryMoneyModule
          ],
        providers: [
            {
                provide: DataSource,
                useValue: dataSource
            },
            {
                provide: 'clearDatabase',
                useValue: async () => {
                  
                  const entities = dataSource.entityMetadatas;

        for (const entity of entities) {
        const repository = dataSource.getRepository(entity.name);
        await repository.query(`TRUNCATE TABLE "${entity.tableName}" CASCADE`);
        } 
                }
            },
            {
                provide: UsuarioFixture,
                useFactory: () => {
                  return UsuarioFixture.create(dataSource)
                }
              },
            {
              provide: ContaFixture,
              useFactory: () => {
                return ContaFixture.create(dataSource)
              }
            },
            {
              provide: OrcamentoFixture,
              useFactory: () => {
                return OrcamentoFixture.create(dataSource)
              }
            },
            {
              provide: TransacaoFixture,
              useFactory: () => {
                return TransacaoFixture.create(dataSource)
              }
            },
            {
              provide: CategoriaFixture,
              useFactory: () => {
                return CategoriaFixture.create(dataSource)
              }
            }
        ]
    }).overrideProvider(DataSource)
    .useValue(dataSource)
    .compile()
    return testingModule
}