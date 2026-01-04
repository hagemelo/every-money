import { ContaDomain } from "@domain/conta.domain";
import { AuthData } from "@domain/data/auth.data";
import { faker } from "@faker-js/faker/.";
import * as request from 'supertest';
import { ContaFixture } from "@infrastructure/database/fixtures/conta.fixture";
import { UsuarioFixture } from "@infrastructure/database/fixtures/usuario.fixture";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TestingModule } from "@nestjs/testing";
import { makeContaEntityFakeNew } from "@test/fake/conta.fake";
import { makeUsuarioEntityFakeNew } from "@test/fake/usuario.fake";
import { buildTestingModule } from "@test/testing.module";
import { DataSource } from "typeorm";
import { initializeTransactionalContext } from "typeorm-transactional";
import { TransacaoDomain } from "@domain/transacao.domain";
import { makeTransacaoEntityFakeNew, makeTransacaoFake } from "@test/fake/transacao.fake";
import { CategoriaFixture } from "@infrastructure/database/fixtures/categoria.fixture";
import { CategoriaDomain } from "@domain/categoria.domain";
import { makeCategoriaEntityFakeNew } from "@test/fake/categoria.fake";
import { ContaEntity } from "@infrastructure/entities/conta.entity";
import { CategoriaEntity } from "@infrastructure/entities/categoria.entity";
import { TransacaoEntity } from "@infrastructure/entities/transacao.entity";
import { TransacaoFixture } from "@infrastructure/database/fixtures/transacao.fixture";
import { TipoCategoriaModel } from "@domain/models/tipo-categoria.model";
import { TipoTransacaoModel } from "@domain/models/tipo-transacao.model";

describe('TransactionController', () => {
    let app: INestApplication;
    let testingModule: TestingModule;
    let usuarioFixture: UsuarioFixture;
    let jwtService: JwtService;
    let token: string;
    let email: string;
    let senha: string;
    let contaFixture: ContaFixture;
    let conta: ContaDomain;
    let categoriaFixture: CategoriaFixture;
    let categoria: CategoriaDomain;  
    let contaEntity: ContaEntity;
    let categoriaEntity: CategoriaEntity;
    let transacaoFixture: TransacaoFixture; 
    
    beforeAll(async () => {
      initializeTransactionalContext();
      testingModule = await buildTestingModule();
      usuarioFixture = testingModule.get(UsuarioFixture);
      transacaoFixture = testingModule.get(TransacaoFixture);
      contaFixture = testingModule.get(ContaFixture);
      categoriaFixture = testingModule.get(CategoriaFixture);
      app = testingModule.createNestApplication();
      app.useGlobalPipes(new ValidationPipe());
  
      const dataSource = app.get(DataSource);
      dataSource.setOptions({ logging: false });
      await app.init();
    });
  
    afterAll(async () => {
      await app.close();
    });
  
    beforeEach(async () => {
        jwtService = testingModule.get(JwtService);
        email = faker.internet.email();
        senha = faker.internet.password();
        const  payload: AuthData = { email, senha };
        const secretKey = process.env.JWT_SECRET || '#jequiladispag@$12';
        token = jwtService.sign(payload, { secret: secretKey });
        const fakeUsuario = makeUsuarioEntityFakeNew({email, senha});
        const usuarioSaved = await usuarioFixture.createFixture({...fakeUsuario});
        contaEntity = makeContaEntityFakeNew({usuario: usuarioSaved});
        contaEntity = await contaFixture.createFixture({...contaEntity});
        conta = contaEntity.toDomain();
        categoriaEntity = makeCategoriaEntityFakeNew({usuario: usuarioSaved, tipo: TipoCategoriaModel.Saida});
        categoriaEntity = await categoriaFixture.createFixture(categoriaEntity);
        categoria = categoriaEntity.toDomain();
    })

    describe('criar-transacao', () => {
        describe('Quando uma transacao for criada com sucesso', () => {
            it('deve retornar uma transacao', async () => {
                const transacaoDomain: TransacaoDomain = makeTransacaoEntityFakeNew({tipo: TipoTransacaoModel.Saida}).toDomain();
                const transacao = transacaoDomain.toModel()
                const response = await request(app.getHttpServer())
                .post(`/transacao/criar-transacao/conta/${conta.id}/categoria/${categoria.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(transacao)
                .expect(201);
                expect(response.body).toHaveProperty('data');
                expect(response.body).toHaveProperty('valor');
                expect(response.body).toHaveProperty('categoria');
                expect(response.body).toHaveProperty('conta');
            });   
        });

        describe('Quando uma transacao for criada com falha', () => {
            it('deve retornar Conta nao encontrada', async () => {
                const contaId = faker.number.int();
                const transacaoDomain: TransacaoDomain = makeTransacaoEntityFakeNew().toDomain();
                const transacao = transacaoDomain.toModel()
                const response = await request(app.getHttpServer())
                    .post(`/transacao/criar-transacao/conta/${contaId}/categoria/${categoria.id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send(transacao)
                    .expect(404);
                expect(response.body.message).toBeDefined();
                expect(response.body.message).toBe('Conta ou categoria nao encontrados');
            });

            it('deve retornar Categoria nao encontrada', async () => {
                const categoriaId = faker.number.int();
                const transacaoDomain: TransacaoDomain = makeTransacaoEntityFakeNew().toDomain();
                const transacao = transacaoDomain.toModel()
                const response = await request(app.getHttpServer())
                    .post(`/transacao/criar-transacao/conta/${conta.id}/categoria/${categoriaId}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send(transacao)
                    .expect(404);
                expect(response.body.message).toBeDefined();
                expect(response.body.message).toBe('Conta ou categoria nao encontrados');
            });
            
            it('deve retornar nao autorizado sem token', async () => {
                const transacaoDomain: TransacaoDomain = makeTransacaoEntityFakeNew().toDomain();
                const transacao = transacaoDomain.toModel()
                const response = await request(app.getHttpServer())
                    .post(`/transacao/criar-transacao/conta/${conta.id}/categoria/${categoria.id}`)
                    .set('Authorization', `Bearer ${null}`)
                    .send(transacao)
                    .expect(401);
                expect(response.body.message).toBeDefined();
            });
        });
    });

    describe('listar-transacoes/conta/:id', () => {
        it('deve listar transações por conta', async () => {
            const fakeTransacao1 = makeTransacaoEntityFakeNew({ conta: contaEntity, categoria: categoriaEntity })
            await transacaoFixture.createFixture(fakeTransacao1)
            const fakeTransacao2 = makeTransacaoEntityFakeNew({ conta: contaEntity, categoria: categoriaEntity })
            await transacaoFixture.createFixture(fakeTransacao2)
            const response = await request(app.getHttpServer())
                .get(`/transacao/listar-transacoes/conta/${conta.id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
            
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('deve listar de transações vazia por conta', async () => {
            const fakeTransacao1 = makeTransacaoEntityFakeNew({ conta: contaEntity, categoria: categoriaEntity })
            await transacaoFixture.createFixture(fakeTransacao1)
            const fakeTransacao2 = makeTransacaoEntityFakeNew({ conta: contaEntity, categoria: categoriaEntity })
            await transacaoFixture.createFixture(fakeTransacao2)

            const accoutId = faker.number.int();
            const response = await request(app.getHttpServer())
                .get(`/transacao/listar-transacoes/conta/${accoutId}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
            
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('listar-transacoes/conta/:id/ano/:ano/mes/:mes', () => {
        it('deve listar transações por conta e período', async () => {
            const tagetMonth = 2
            const tagetYear = 2025
            const month = 10
            const year = 2024

            const fakeTransacao1 = makeTransacaoEntityFakeNew({ conta: contaEntity, categoria: categoriaEntity, data: new Date(tagetYear, tagetMonth, 30) })
            await transacaoFixture.createFixture(fakeTransacao1)
            const fakeTransacao2 = makeTransacaoEntityFakeNew({ conta: contaEntity, categoria: categoriaEntity, data: new Date(tagetYear, tagetMonth, 13) })
            await transacaoFixture.createFixture(fakeTransacao2)

            const fakeTransacao3 = makeTransacaoEntityFakeNew({ conta: contaEntity, categoria: categoriaEntity, data: new Date(year, month) })
            await transacaoFixture.createFixture(fakeTransacao3)
            const fakeTransacao4 = makeTransacaoEntityFakeNew({ conta: contaEntity, categoria: categoriaEntity, data: new Date(year, month) })
            await transacaoFixture.createFixture(fakeTransacao4)

            const mesParam = tagetMonth +1;
            const response = await request(app.getHttpServer())
                .get(`/transacao/listar-transacoes/conta/${conta.id}/ano/${tagetYear}/mes/${mesParam}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
        
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(2);
        });

         it('deve listar de transações vazia por conta e período', async () => {

            const month = 10
            const year = 2024
            const fakeTransacao1 = makeTransacaoEntityFakeNew({ conta: contaEntity, categoria: categoriaEntity, data: new Date(year) })
            await transacaoFixture.createFixture(fakeTransacao1)
            const fakeTransacao2 = makeTransacaoEntityFakeNew({ conta: contaEntity, categoria: categoriaEntity, data: new Date(year) })
            await transacaoFixture.createFixture(fakeTransacao2)

            const response = await request(app.getHttpServer())
                .get(`/transacao/listar-transacoes/conta/${conta.id}/ano/2025/mes/1`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
        
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(0);
        });
    });

});

