
import { TestingModule } from "@nestjs/testing";

import { UsuarioRepository } from "@domain/interfaces/usuario.repository";
import { UsuarioFixture } from "@infrastructure/database/fixtures/usuario.fixture";
import { buildTestingModule } from "@test/testing.module";
import { makeUsuarioEntityFakeNew } from "@test/fake/usuario.fake";
import { faker } from "@faker-js/faker/.";
import { UsuarioEntity } from "@infrastructure/entities/usuario.entity";
import { DataSource } from "typeorm";
import { ContaFixture } from "@infrastructure/database/fixtures/conta.fixture";
import { ContaRepository } from "@domain/interfaces/conta.repository";
import { makeContaEntityFakeNew, makeContaFake } from "@test/fake/conta.fake";
import { ContaEntity } from "@infrastructure/entities/conta.entity";
import { ContaDomain } from "@domain/conta.domain";

let testingModule: TestingModule
let contaFixture: ContaFixture
let contaRepository: ContaRepository
let usuarioFixture: UsuarioFixture
let usuarioRepository: UsuarioRepository
let dataSource: DataSource

describe('ContaRepositoryPostgres', () => {
    beforeAll(async () => {
      testingModule = await buildTestingModule()
      contaFixture = testingModule.get(ContaFixture)
      contaRepository = await testingModule.resolve(ContaRepository)
      usuarioFixture = testingModule.get(UsuarioFixture)
      usuarioRepository = await testingModule.resolve(UsuarioRepository)
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
            const usuario: UsuarioEntity = await usuarioFixture.createFixture({...fakeUsuario})
            const fakeConta = makeContaEntityFakeNew({usuario})
            const conta: ContaEntity = await contaFixture.createFixture({...fakeConta})
            const result = await contaRepository.findAllByUsuarioId(usuario.id)
            expect(result).toBeInstanceOf(Array)
            expect(result[0].nome).toBe(fakeConta.nome)
            expect(result[0].saldoRealizado).toBe(fakeConta.saldoRealizado)
            expect(result[0].saldoPrevisto).toBe(fakeConta.saldoPrevisto)
            expect(result[0].tipoConta).toBe(fakeConta.tipoConta)
            expect(result[0].usuario.id).toBe(usuario.id)
        })
    })
    describe('Quando a funcao delete for chamada', () => {
        it('deve deletar uma conta', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
            const usuario: UsuarioEntity = await usuarioFixture.createFixture({...fakeUsuario})
            const fakeConta = makeContaEntityFakeNew({usuario})
            const conta: ContaEntity = await contaFixture.createFixture({...fakeConta})
            await contaRepository.delete(conta.id)
            const result = await contaRepository.findAllByUsuarioId(usuario.id)
            expect(result).toHaveLength(0)
        })
    })

    describe('Quando a funcao save for chamada', () => {
        it('deve salvar uma conta', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
            const usuario: UsuarioEntity = await usuarioFixture.createFixture(fakeUsuario)
            const fakeConta1 = makeContaFake({usuario})
            const result = await contaRepository.saveDomain(fakeConta1)
            expect(result).toBeInstanceOf(ContaDomain)
            expect(result.nome).toBe(fakeConta1.nome)
            expect(result.saldoRealizado).toBe(fakeConta1.saldoRealizado)
            expect(result.saldoPrevisto).toBe(fakeConta1.saldoPrevisto)
            expect(result.tipoConta).toBe(fakeConta1.tipoConta)
            expect(result.usuario.id).toBe(usuario.id)
        })
    })


    describe('Quando a funcao findById for chamada', () => {
        it('deve retornar uma conta', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
            const usuario: UsuarioEntity = await usuarioFixture.createFixture(fakeUsuario)
            const fakeConta = makeContaEntityFakeNew({usuario})
            const conta: ContaEntity = await contaFixture.createFixture(fakeConta)
            const result = await contaRepository.findById({id: conta.id})
            expect(result).toBeInstanceOf(ContaEntity)
            expect(result.nome).toBe(fakeConta.nome)
            expect(result.saldoRealizado).toBe(fakeConta.saldoRealizado)
            expect(result.saldoPrevisto).toBe(fakeConta.saldoPrevisto)
            expect(result.tipoConta).toBe(fakeConta.tipoConta)
        })
    })

    describe('Quando a funcao findAll for chamada', () => {
        it('deve retornar todas as contas', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
            const usuario: UsuarioEntity = await usuarioFixture.createFixture({...fakeUsuario})
            const fakeConta1 = makeContaEntityFakeNew({usuario})
            const fakeConta2 = makeContaEntityFakeNew({usuario})
            const conta1: ContaEntity = await contaFixture.createFixture({...fakeConta1})
            const conta2: ContaEntity = await contaFixture.createFixture({...fakeConta2})
            const result = await contaRepository.findAll()
            expect(result).toBeInstanceOf(Array)
            expect(result[0].nome).toBe(fakeConta1.nome)
            expect(result[0].saldoRealizado).toBe(fakeConta1.saldoRealizado)
            expect(result[0].saldoPrevisto).toBe(fakeConta1.saldoPrevisto)
            expect(result[0].tipoConta).toBe(fakeConta1.tipoConta)
            expect(result[1].nome).toBe(fakeConta2.nome)
            expect(result[1].saldoRealizado).toBe(fakeConta2.saldoRealizado)
            expect(result[1].saldoPrevisto).toBe(fakeConta2.saldoPrevisto)
            expect(result[1].tipoConta).toBe(fakeConta2.tipoConta)
        })
    })

})