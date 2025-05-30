
import { TestingModule } from "@nestjs/testing";

import { UsuarioRepository } from "@domain/interfaces/usuario.repository";
import { UsuarioFixture } from "@infrastructure/database/fixtures/usuario.fixture";
import { buildTestingModule } from "@test/testing.module";
import {  makeUsuarioEntityFakeNew } from "@test/fake/usuario.fake";
import { faker } from "@faker-js/faker/.";
import { UsuarioEntity } from "@infrastructure/entities/usuario.entity";
import { UsuarioDomain } from "@domain/usuario.domain";
import { DataSource } from "typeorm";

let testingModule: TestingModule
let usuarioFixture: UsuarioFixture
let usuarioRepository: UsuarioRepository
let dataSource: DataSource

describe('UsuarioRepositoryPostgres', () => {
    beforeAll(async () => {
      testingModule = await buildTestingModule()
      usuarioFixture = testingModule.get(UsuarioFixture)
      usuarioRepository = await testingModule.resolve(UsuarioRepository)
      dataSource = testingModule.get(DataSource)
    })
  
    afterEach(async () => {
        await testingModule.get('clearDatabase')()
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    describe('Quando a funcao findUserByEmailAndPassword for chamada', () => {
        it('deve retornar um usuario', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
            const usuario: UsuarioEntity = await usuarioFixture.createFixture({...fakeUsuario})
            const result = await usuarioRepository.findUserByEmailAndPassword(email, senha)
            expect(result).toBeInstanceOf(UsuarioDomain)
            expect(result.email).toBe(email)
            expect(result.senha).toBe(senha)
        })
    })

    describe('Quando a senha do usuario alterada', () => {
        it('deve alterar a senha do usuario', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
            const usuario: UsuarioEntity = await usuarioFixture.createFixture({...fakeUsuario})
            const novaSenha = faker.internet.password()
            usuario.senha = novaSenha
            const usuarioDomain = usuario.toDomain()
            usuarioDomain.alterarSenha(novaSenha)
            
            await usuarioRepository.save(usuarioDomain)

            const result = await usuarioRepository.findUserByEmailAndPassword(email, novaSenha)
            expect(result).toBeInstanceOf(UsuarioDomain)
            expect(result.email).toBe(email)
            expect(result.senha).toBe(novaSenha)
        })
    })

    describe('Quando a funcao delete for chamada', () => {
        it('deve deletar um usuario', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
            const usuario: UsuarioEntity = await usuarioFixture.createFixture(fakeUsuario)
            console.dir(usuario)
            await usuarioRepository.delete(usuario.id)
            const result = await usuarioRepository.findUserByEmailAndPassword(email, senha)
            expect(result).toBeUndefined()
        })
    })

    describe('Quando a funcao findAllWithoutPassword for chamada', () => {
        it('deve retornar todos os usuarios sem a senha', async () => {

            const fakeUsuario1 = makeUsuarioEntityFakeNew({email: faker.internet.email(), senha: faker.internet.password()})
            const fakeUsuario2 = makeUsuarioEntityFakeNew({email: faker.internet.email(), senha: faker.internet.password()})
            
            const usuario1: UsuarioEntity = await usuarioFixture.createFixture({...fakeUsuario1})
            const usuario2: UsuarioEntity = await usuarioFixture.createFixture({...fakeUsuario2})
            const result = await usuarioRepository.findAllWithoutPassword()
            expect(result).toHaveLength(2)
            expect(result[0].email).toBe(usuario1.email)
            expect(result[1].email).toBe(usuario2.email) 
        })
    })

    describe('Quando a funcao findAll for chamada', () => {
        it('deve retornar todos os usuarios', async () => {

            const fakeUsuario1 = makeUsuarioEntityFakeNew({email: faker.internet.email(), senha: faker.internet.password()})
            const fakeUsuario2 = makeUsuarioEntityFakeNew({email: faker.internet.email(), senha: faker.internet.password()})
            
            const usuario1: UsuarioEntity = await usuarioFixture.createFixture({...fakeUsuario1})
            const usuario2: UsuarioEntity = await usuarioFixture.createFixture({...fakeUsuario2})
            const result = await usuarioRepository.findAll()
            expect(result).toHaveLength(2)
            expect(result[0].email).toBe(usuario1.email)
            expect(result[1].email).toBe(usuario2.email) 
        })
    })


    describe('Quando a funcao findById for chamada', () => {
        it('deve retornar um usuario', async () => {

            const fakeUsuario1 = makeUsuarioEntityFakeNew({email: faker.internet.email(), senha: faker.internet.password()})
            const usuario1: UsuarioEntity = await usuarioFixture.createFixture({...fakeUsuario1})
            const result = await usuarioRepository.findById({id: usuario1.id})
            expect(result).toBeInstanceOf(UsuarioEntity)
            expect(result.email).toBe(usuario1.email)
        })
    })
})