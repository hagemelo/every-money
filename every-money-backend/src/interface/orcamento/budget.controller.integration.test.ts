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
import { CreateAccountData } from "@domain/data/create-account.data";
import { OrcamentoDomain } from "@domain/orcamento.domain";
import { makeOrcamentoFake } from "@test/fake/orcamento.fake";

describe('BudgetController', () => {
    let app: INestApplication;
    let testingModule: TestingModule;
    let usuarioFixture: UsuarioFixture;
    let jwtService: JwtService;
    let token: string;
    let email: string;
    let senha: string;
    let contaFixture: ContaFixture;
    let conta: ContaDomain;
  
    beforeAll(async () => {
      initializeTransactionalContext();
      testingModule = await buildTestingModule();
      usuarioFixture = testingModule.get(UsuarioFixture);
      contaFixture = testingModule.get(ContaFixture);
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
    })

    describe('criar-orcamento', () => {
        describe('Quando um orcamento for criado com sucesso', () => {
            it('deve retornar um orcamento', async () => {
                const orcamentoDomain: OrcamentoDomain = makeOrcamentoFake();
                const orcamento = orcamentoDomain.toModel()
            
                const response = await request(app.getHttpServer())
                .post(`/orcamento/criar-orcamento/conta/${conta.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(orcamento)
                .expect(201);
                expect(response.body).toHaveProperty('mesReferencia', orcamento.mesReferencia);
                expect(response.body).toHaveProperty('limite', orcamento.limite);
                expect(response.body).toHaveProperty('tipoCategoria', orcamento.tipoCategoria);
                expect(response.body).toHaveProperty('conta');
            });   
        });

        describe('Quando um orcamento for criado com falha', () => {
            it('deve retornar Conta nao encontrada', async () => {
                const contaId = faker.number.int();
                const orcamentoDomain: OrcamentoDomain = makeOrcamentoFake();
                const orcamento = orcamentoDomain.toModel();
                const response = await request(app.getHttpServer())
                    .post(`/orcamento/criar-orcamento/conta/${contaId}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send(orcamento)
                    .expect(401);
                expect(response.body.message).toBeDefined();
            });
            
            it('deve retornar nao autorizado sem token', async () => {
                const orcamentoDomain: OrcamentoDomain = makeOrcamentoFake();
                const orcamento = orcamentoDomain.toModel();
                const response = await request(app.getHttpServer())
                    .post(`/orcamento/criar-orcamento/conta/${conta.id}`)
                    .set('Authorization', `Bearer ${null}`)
                    .send(orcamento)
                    .expect(401);
                expect(response.body.message).toBeDefined();
            });
        });
    });
});

