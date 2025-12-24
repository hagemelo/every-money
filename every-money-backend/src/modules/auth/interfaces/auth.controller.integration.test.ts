import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { buildTestingModule } from '@test/testing.module';
import { TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker/.';
import { makeUsuarioEntityFakeNew } from '@test/fake/usuario.fake';
import { UsuarioFixture } from '@infrastructure/database/fixtures/usuario.fixture';
import { DataSource } from 'typeorm';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let testingModule: TestingModule
  let usuarioFixture: UsuarioFixture

  beforeAll(async () => {
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

  it('/auth/login (POST) - success', async () => {
    const email = faker.internet.email()
    const senha = faker.internet.password()
    const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
    await usuarioFixture.createFixture({...fakeUsuario})
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, senha })
      .expect(201);

    expect(response.body).toHaveProperty('accessToken');
    expect(typeof response.body.accessToken).toBe('string');
  });

  it('/auth/login (POST) - fail with wrong credentials', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'wronguser', senha: 'wrongpass' })
      .expect(401);
    expect(response.body.message).toBeDefined();
  });

  it('/auth/refresh (POST) - success', async () => {
     const email = faker.internet.email()
    const senha = faker.internet.password()
    const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
    await usuarioFixture.createFixture({...fakeUsuario})
    const responseLogin = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, senha })
      .expect(201);

    expect(responseLogin.body).toHaveProperty('refreshToken');

    const {refreshToken} = responseLogin.body
    const response = await request(app.getHttpServer())
                .post('/auth/refresh')
                .set('Authorization', `Bearer ${refreshToken}`)
                .expect(201);
    expect(response.body).toHaveProperty('accessToken');
    expect(typeof response.body.accessToken).toBe('string');
    expect(response.body).toHaveProperty('refreshToken');
    expect(typeof response.body.refreshToken).toBe('string');

  });
});
