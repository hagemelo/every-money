import { AuthData } from "@domain/data/auth.data";
import { UsuarioDomain } from "@domain/usuario.domain";
import { faker } from "@faker-js/faker/.";
import * as request from 'supertest';
import { UsuarioFixture } from "@infrastructure/database/fixtures/usuario.fixture";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TestingModule } from "@nestjs/testing";
import { makeUsuarioEntityFakeNew } from "@test/fake/usuario.fake";
import { buildTestingModule } from "@test/testing.module";
import { DataSource } from "typeorm";
import { initializeTransactionalContext } from "typeorm-transactional";
import { CreateAccountData } from "@domain/data/create-account.data";
import { makeContaEntityFakeNew } from "@test/fake/conta.fake";
import { ContaFixture } from "@infrastructure/database/fixtures/conta.fixture";
import { UsuarioEntity } from "@infrastructure/entities/usuario.entity";

describe('AccountController', () => {
    let app: INestApplication;
    let testingModule: TestingModule
    let usuarioFixture: UsuarioFixture
    let jwtService: JwtService;
    let token: string;
    let email: string;
    let senha: string;
    let usuario: UsuarioDomain;
    let contaFixture: ContaFixture;
  
    beforeAll(async () => {
      initializeTransactionalContext();
      testingModule = await buildTestingModule()
      usuarioFixture = testingModule.get(UsuarioFixture)
      contaFixture = testingModule.get(ContaFixture)
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
        email = faker.internet.email()
        senha = faker.internet.password()
        const  payload: AuthData = { email, senha };
        const secretKey = process.env.JWT_SECRET || '#jequiladispag@$12';
        token = jwtService.sign(payload, { secret: secretKey });
        const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
        const usuarioSaved = await usuarioFixture.createFixture({...fakeUsuario})
        usuario = usuarioSaved.toDomain()
    })

    describe('criar-conta', () => {

        describe('Quando um conta for criada com sucesso', () => {
            it('deve retornar um usuario', async () => {
                const dataUser = usuario.toModel()
                const contaDomain = makeContaEntityFakeNew().toDomain()
                const conta = contaDomain.toModel()
                const data: CreateAccountData = {
                    usuario: dataUser,
                    conta
                }
                const response = await request(app.getHttpServer())
                .post('/conta/criar-conta')
                .set('Authorization', `Bearer ${token}`)
                .send(data)
                .expect(201);
                expect(response.body).toHaveProperty('nome', conta.nome);
                expect(response.body).toHaveProperty('saldoRealizado', conta.saldoRealizado);
                expect(response.body).toHaveProperty('saldoPrevisto', conta.saldoPrevisto);
                expect(response.body).toHaveProperty('tipoConta', conta.tipoConta);
                expect(response.body).toHaveProperty('usuario');
            });
        });
    
        describe('Quando o usuario criar uma conta com falha', () => {
            it('deve retornar Usuario nao encontrado', async () => {
              const contaDomain = makeContaEntityFakeNew().toDomain()
              const conta = contaDomain.toModel()
              const data: CreateAccountData = {
                  usuario: null,
                  conta
              }
                const response = await request(app.getHttpServer())
                  .post('/conta/criar-conta')
                  .set('Authorization', `Bearer ${token}`)
                  .send(data)
                  .expect(401);
                expect(response.body.message).toBeDefined();
            });
    
            it('deve retornar nao autorizado sem token', async () => {
              const contaDomain = makeContaEntityFakeNew().toDomain()
              const conta = contaDomain.toModel()
              const data: CreateAccountData = {
                  usuario: usuario.toModel(),
                  conta
              }
                const response = await request(app.getHttpServer())
                  .post('/conta/criar-conta')
                  .set('Authorization', `Bearer ${null}`)
                  .send(data)
                  .expect(401);
                expect(response.body.message).toBeDefined();
            });
        });
    })

    describe('listar-contas/usuario/:id', () => {
        describe('Quando listar as contas do usuario com sucesso', () => {
           it('deve retornar listagem de contas', async () => {
               const dataUser = UsuarioEntity.fromDomain( usuario)
               const fakeConta1 = makeContaEntityFakeNew({ usuario:dataUser})
               await contaFixture.createFixture({...fakeConta1})
               const fakeConta2 = makeContaEntityFakeNew({ usuario:dataUser})
               await contaFixture.createFixture({...fakeConta2})
               const response = await request(app.getHttpServer())
               .get(`/conta/listar-contas/usuario/${usuario.id}`)
               .set('Authorization', `Bearer ${token}`)
               .expect(200);
               expect(response.body).toHaveLength(2);
           });
   
          it('deve retornar listagem de contas vazia', async () => {
             const id = faker.number.int()
             const response = await request(app.getHttpServer())
             .get(`/conta/listar-contas/usuario/${id}`)
             .set('Authorization', `Bearer ${token}`)
             .expect(200);
             expect(response.body).toHaveLength(0);
          });
        });
   
        describe('Quando listar as contas do usuario com falha', () => {
   
         it('deve retornar nao autorizado sem token', async () => {
           const id = faker.number.int()
           const response = await request(app.getHttpServer())
                       .get(`/conta/listar-contas/usuario/${id}`)
                       .set('Authorization', `Bearer ${null}`)
                       .expect(401);
           expect(response.body.message).toBeDefined();
         });
        });
    })

})