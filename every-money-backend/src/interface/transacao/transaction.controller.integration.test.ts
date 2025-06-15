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
    
    beforeAll(async () => {
      initializeTransactionalContext();
      testingModule = await buildTestingModule();
      usuarioFixture = testingModule.get(UsuarioFixture);
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
        let  contaEntity = makeContaEntityFakeNew({usuario: usuarioSaved});
        contaEntity = await contaFixture.createFixture({...contaEntity});
        conta = contaEntity.toDomain();
        let  categoriaEntity = makeCategoriaEntityFakeNew({usuario: usuarioSaved});
        categoriaEntity = await categoriaFixture.createFixture(categoriaEntity);
        categoria = categoriaEntity.toDomain();
    })

    describe('criar-transacao', () => {
        describe('Quando uma transacao for criada com sucesso', () => {
            it('deve retornar uma transacao', async () => {
                const transacaoDomain: TransacaoDomain = makeTransacaoEntityFakeNew().toDomain();
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
});

