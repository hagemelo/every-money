import { INestApplication } from "@nestjs/common";
import { TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { UsuarioFixture } from "@infrastructure/database/fixtures/usuario.fixture";
import { JwtService } from "@nestjs/jwt";
import { UsuarioDomain } from "@domain/usuario.domain";
import { initializeTransactionalContext } from "typeorm-transactional";
import { buildTestingModule } from "@test/testing.module";
import { DataSource } from "typeorm";
import { ValidationPipe } from "@nestjs/common";
import { faker } from "@faker-js/faker/.";
import { AuthData } from "@domain/data/auth.data";
import { makeUsuarioEntityFakeNew } from "@test/fake/usuario.fake";
import { makeContaEntityFakeNew } from "@test/fake/conta.fake";
import { ContaFixture } from "@infrastructure/database/fixtures/conta.fixture";
import { UsuarioEntity } from "@infrastructure/entities/usuario.entity";

describe('ListAllAccountByUserIdController', () => {
    let app: INestApplication;
    let testingModule: TestingModule
    let usuarioFixture: UsuarioFixture
    let jwtService: JwtService;
    let token: string;
    let email: string;
    let senha: string;
    let usuario: UsuarioDomain;
    let contaFixture: ContaFixture
  
    beforeAll(async () => {
      initializeTransactionalContext();
      testingModule = await buildTestingModule()
      usuarioFixture = testingModule.get(UsuarioFixture)
      contaFixture = testingModule.get(ContaFixture)
      app = testingModule.createNestApplication();
      app.useGlobalPipes(new ValidationPipe()); // If you use validation
  
      const dataSource = app.get(DataSource);
      dataSource.setOptions({ logging: true });
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
      const usuarioEntity: UsuarioEntity = await usuarioFixture.createFixture({...fakeUsuario})
      usuario = usuarioEntity.toDomain()
    })

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
   
});