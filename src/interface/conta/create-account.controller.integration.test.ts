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

describe('CreateAccountController', () => {
    let app: INestApplication;
    let testingModule: TestingModule
    let usuarioFixture: UsuarioFixture
    let jwtService: JwtService;
    let token: string;
    let email: string;
    let senha: string;
    let usuario: UsuarioDomain;
  
    beforeAll(async () => {
      initializeTransactionalContext();
      testingModule = await buildTestingModule()
      usuarioFixture = testingModule.get(UsuarioFixture)
      app = testingModule.createNestApplication();
      app.useGlobalPipes(new ValidationPipe()); // If you use validation
  
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
  
      // Mock a user payload (e.g., from DB)
       const  payload: AuthData = { email, senha };
      const secretKey = process.env.JWT_SECRET || '#jequiladispag@$12';
      // Generate JWT token for testing
      token = jwtService.sign(payload, { secret: secretKey });
      const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
      await usuarioFixture.createFixture({...fakeUsuario})
      usuario = fakeUsuario.toDomain()
    })

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