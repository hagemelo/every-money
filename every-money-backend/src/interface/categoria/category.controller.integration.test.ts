import { JwtService } from "@nestjs/jwt";
import * as request from 'supertest';
import { TestingModule } from "@nestjs/testing";
import { makeCategoriaEntityFakeNew } from "@test/fake/categoria.fake";
import { buildTestingModule } from "@test/testing.module";
import { DataSource } from "typeorm";
import { initializeTransactionalContext } from "typeorm-transactional";
import { CreateCategoryData } from "@domain/data/create-category.data";
import { UsuarioDomain } from "@domain/usuario.domain";
import { CategoriaFixture } from "@infrastructure/database/fixtures/categoria.fixture";
import { UsuarioFixture } from "@infrastructure/database/fixtures/usuario.fixture";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { faker } from "@faker-js/faker/.";
import { AuthData } from "@domain/data/auth.data";
import { makeUsuarioEntityFakeNew } from "@test/fake/usuario.fake";
import { UsuarioEntity } from "@infrastructure/entities/usuario.entity";


describe('CategoryController', () => {

    let app: INestApplication;
    let testingModule: TestingModule
    let usuarioFixture: UsuarioFixture
    let jwtService: JwtService;
    let token: string;
    let email: string;
    let senha: string;
    let usuario: UsuarioDomain;
    let usuarioSaved: UsuarioEntity;
    let categoriaFixture: CategoriaFixture;
    
    beforeAll(async () => {
        initializeTransactionalContext();
        testingModule = await buildTestingModule()
        usuarioFixture = testingModule.get(UsuarioFixture)
        categoriaFixture = testingModule.get(CategoriaFixture)
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
        usuarioSaved = await usuarioFixture.createFixture({...fakeUsuario})
        usuario = usuarioSaved.toDomain()
    })

    describe('criar-categoria', () => {
        describe('Quando uma categoria for criada com sucesso', () => {
            it('deve retornar uma categoria', async () => {
                const dataUser = usuario.toModel()
                const categoriaDomain = makeCategoriaEntityFakeNew().toDomain()
                const categoria = categoriaDomain.toModel()
                const data: CreateCategoryData = {
                    usuario: dataUser,
                    categoria: categoria
                }
                const response = await request(app.getHttpServer())
                .post('/categoria/criar-categoria')
                .set('Authorization', `Bearer ${token}`)
                .send(data)
                .expect(201);
                expect(response.body).toHaveProperty('nome', categoria.nome);
                expect(response.body).toHaveProperty('tipo', categoria.tipo);
                expect(response.body).toHaveProperty('classificacao', categoria.classificacao);
                expect(response.body).toHaveProperty('usuario');
            });
        });
        
        describe('Quando o usuario criar uma conta com falha', () => {
            it('deve retornar Usuario nao encontrado', async () => {
                const categoriaDomain = makeCategoriaEntityFakeNew().toDomain()
                const categoria = categoriaDomain.toModel()
                const data: CreateCategoryData = {
                    usuario: null,
                    categoria
                }
                const response = await request(app.getHttpServer())
                    .post('/categoria/criar-categoria')
                    .set('Authorization', `Bearer ${token}`)
                    .send(data)
                    .expect(401);
                expect(response.body.message).toBeDefined();
            });
    
            it('deve retornar nao autorizado sem token', async () => {
                const categoriaDomain = makeCategoriaEntityFakeNew().toDomain()
                const categoria = categoriaDomain.toModel()
                const data: CreateCategoryData = {
                    usuario: usuario.toModel(),
                    categoria
                }
                const response = await request(app.getHttpServer())
                    .post('/categoria/criar-categoria')
                    .set('Authorization', `Bearer ${null}`)
                    .send(data)
                    .expect(401);
                expect(response.body.message).toBeDefined();
            });
        });
    })

    describe('listar-categorias/usuario/:id', () => {
        describe('Quando listar as categorias do usuario com sucesso', () => {
            it('deve retornar listagem de categorias', async () => {

                const fakeCategoria1 = makeCategoriaEntityFakeNew({ usuario: usuarioSaved})
                await categoriaFixture.createFixture({...fakeCategoria1})
                const fakeCategoria2 = makeCategoriaEntityFakeNew({ usuario: usuarioSaved})
                await categoriaFixture.createFixture({...fakeCategoria2})
                const response = await request(app.getHttpServer())
                .get(`/categoria/listar-categorias/usuario/${usuario.id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
                expect(response.body).toHaveLength(2);
            });
    
            it('deve retornar listagem de categorias vazia', async () => {
                const id = faker.number.int()
                const response = await request(app.getHttpServer())
                .get(`/categoria/listar-categorias/usuario/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
                expect(response.body).toHaveLength(0);
            });
        });
       
        describe('Quando listar as categorias do usuario com falha', () => {
    
            it('deve retornar nao autorizado sem token', async () => {
            const id = faker.number.int()
            const response = await request(app.getHttpServer())
                        .get(`/categoria/listar-categorias/usuario/${id}`)
                        .set('Authorization', `Bearer ${null}`)
                        .expect(401);
            expect(response.body.message).toBeDefined();
            });
        });
    })

});
