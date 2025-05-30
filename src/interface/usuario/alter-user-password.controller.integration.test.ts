import { INestApplication, ValidationPipe } from "@nestjs/common";
import { TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { UsuarioFixture } from "@infrastructure/database/fixtures/usuario.fixture";
import { buildTestingModule } from "@test/testing.module";
import { DataSource } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { faker } from "@faker-js/faker/.";
import { makeUsuarioEntityFakeNew } from "@test/fake/usuario.fake";
import { AuthData } from "@domain/data/auth.data";
import { initializeTransactionalContext  } from "typeorm-transactional";

describe('AlterUserPasswordController', () => {
  let app: INestApplication;
  let testingModule: TestingModule
  let usuarioFixture: UsuarioFixture
  let jwtService: JwtService;
  let token: string;
  let email: string;
  let senha: string;

  beforeAll(async () => {
    initializeTransactionalContext();
    testingModule = await buildTestingModule()
    usuarioFixture = testingModule.get(UsuarioFixture)
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
    await usuarioFixture.createFixture({...fakeUsuario})
  })

    describe('Quando o usuario alterar sua senha com sucesso', () => {
        it('deve retornar um usuario', async () => {

            const novaSenha = faker.internet.password()
            const response = await request(app.getHttpServer())
            .post('/usuario/alterar-senha')
            .set('Authorization', `Bearer ${token}`)
            .send({
                email,
                senha,
                novaSenha
            })
            .expect(201);
            console.dir(response.body)
            expect(response.body).toHaveProperty('email', email);
            expect(response.body).toHaveProperty('senha', novaSenha);
          
        });
    });

    describe('Quando o usuario alterar sua senha com falha', () => {
     it('deve retornar um usuario', async () => {
        const response = await request(app.getHttpServer())
          .post('/usuario/alterar-senha')
          .set('Authorization', `Bearer ${token}`)
          .send({ email: 'wronguser', senha: 'wrongpass' })
          .expect(401);
        console.log(response.body)
    
        expect(response.body.message).toBeDefined();
      });
    });

});


