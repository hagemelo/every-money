
import { TestingModule } from "@nestjs/testing";

import { UsuarioFixture } from "@infrastructure/database/fixtures/usuario.fixture";
import { buildTestingModule } from "@test/testing.module";
import { makeUsuarioEntityFakeNew } from "@test/fake/usuario.fake";
import { faker } from "@faker-js/faker/.";
import { UsuarioEntity } from "@infrastructure/entities/usuario.entity";
import { DataSource } from "typeorm";
import { makeCategoriaEntityFakeNew, makeCategoriaFake } from "@test/fake/categoria.fake";
import { CategoriaEntity } from "@infrastructure/entities/categoria.entity";
import { CategoriaFixture } from "@infrastructure/database/fixtures/categoria.fixture";
import { CategoriaRepository } from "@domain/interfaces/categoria.repository";
import { CategoriaDomain } from "@domain/categoria.domain";

let testingModule: TestingModule
let usuarioFixture: UsuarioFixture
let categoriaFixture: CategoriaFixture
let categoriaRepository: CategoriaRepository
let dataSource: DataSource

describe('CategoriaRepositoryPostgres', () => {
    beforeAll(async () => {
      testingModule = await buildTestingModule()
      usuarioFixture = testingModule.get(UsuarioFixture)
      categoriaFixture = testingModule.get(CategoriaFixture)
      categoriaRepository = await testingModule.resolve(CategoriaRepository)
      dataSource = testingModule.get(DataSource)
    })
  
    afterEach(async () => {
        await testingModule.get('clearDatabase')()
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    describe('Quando a funcao findAllByUsuarioId for chamada', () => {
        it('deve retornar as contas do usuario', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
            const usuario: UsuarioEntity = await usuarioFixture.createFixture(fakeUsuario)
            const fakeCategoria = makeCategoriaEntityFakeNew({usuario})
            const categoria: CategoriaEntity = await categoriaFixture.createFixture(fakeCategoria)
            const result = await categoriaRepository.findAllByUsuarioId(usuario.id)
            expect(result).toBeInstanceOf(Array)
            expect(result[0].nome).toBe(fakeCategoria.nome)
            expect(result[0].usuario.id).toBe(usuario.id)
        })
    })

    describe('Quando a funcao delete for chamada', () => {
        it('deve deletar uma categoria', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
            const usuario: UsuarioEntity = await usuarioFixture.createFixture(fakeUsuario)
            const fakeCategoria = makeCategoriaEntityFakeNew({usuario})
            const categoria: CategoriaEntity = await categoriaFixture.createFixture(fakeCategoria)
            await categoriaRepository.delete(categoria.id)
            const result = await categoriaRepository.findAllByUsuarioId(usuario.id)
            expect(result).toHaveLength(0)
        })
    })

    describe('Quando a funcao save for chamada', () => {
        it('deve salvar uma categoria', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
            const usuario: UsuarioEntity = await usuarioFixture.createFixture(fakeUsuario)
            
            const categoria = makeCategoriaFake({usuario})
            const result = await categoriaRepository.saveDomain(categoria)
            expect(result).toBeInstanceOf(CategoriaDomain)
            expect(result.nome).toBe(categoria.nome)
            expect(result.usuario.id).toBe(usuario.id)  
            expect(result.tipo).toBe(categoria.tipo)
        })
    })

    describe('Quando a funcao findById for chamada', () => {
        it('deve retornar uma categoria', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
            const usuario: UsuarioEntity = await usuarioFixture.createFixture(fakeUsuario)
            const fakeCategoria = makeCategoriaEntityFakeNew({usuario})
            const categoria: CategoriaEntity = await categoriaFixture.createFixture(fakeCategoria)
            const result = await categoriaRepository.findById({id: categoria.id})
            expect(result).toBeInstanceOf(CategoriaEntity)
            expect(result.nome).toBe(fakeCategoria.nome)
            expect(result.tipo).toBe(fakeCategoria.tipo)
        })
    })

    describe('Quando a funcao findAll for chamada', () => {
        it('deve retornar todas as categorias', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
            const usuario: UsuarioEntity = await usuarioFixture.createFixture({...fakeUsuario})
            const fakeCategoria1 = makeCategoriaEntityFakeNew({usuario})
            const fakeCategoria2 = makeCategoriaEntityFakeNew({usuario})
            const categoria1: CategoriaEntity = await categoriaFixture.createFixture({...fakeCategoria1})
            const categoria2: CategoriaEntity = await categoriaFixture.createFixture({...fakeCategoria2})
            const result = await categoriaRepository.findAll()
            expect(result).toBeInstanceOf(Array)
            expect(result[0].nome).toBe(fakeCategoria1.nome)
            expect(result[0].tipo).toBe(fakeCategoria1.tipo)
            expect(result[1].nome).toBe(fakeCategoria2.nome)
            expect(result[1].tipo).toBe(fakeCategoria2.tipo)
        })
    })

})