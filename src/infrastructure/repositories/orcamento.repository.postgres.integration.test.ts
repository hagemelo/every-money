
import { TestingModule } from "@nestjs/testing";

import { buildTestingModule } from "@test/testing.module";
import { faker } from "@faker-js/faker/.";
import { DataSource } from "typeorm";
import { ContaFixture } from "@infrastructure/database/fixtures/conta.fixture";
import { OrcamentoFixture } from "@infrastructure/database/fixtures/orcamento.fixture";
import { makeContaEntityFakeNew } from "@test/fake/conta.fake";
import { ContaEntity } from "@infrastructure/entities/conta.entity";
import { makeOrcamentoEntityFakeNew, makeOrcamentoFake } from "@test/fake/orcamento.fake";
import { OrcamentoEntity } from "@infrastructure/entities/orcamento.entity";
import { UsuarioFixture } from "@infrastructure/database/fixtures/usuario.fixture";
import { OrcamentoRepository } from "@domain/repositories/orcamento.repository";
import { makeUsuarioEntityFakeNew } from "@test/fake/usuario.fake";
import { UsuarioEntity } from "@infrastructure/entities/usuario.entity";
import { OrcamentoDomain } from "@domain/orcamento.domain";

let testingModule: TestingModule
let usuarioFixture: UsuarioFixture
let contaFixture: ContaFixture
let orcamentoFixture: OrcamentoFixture
let orcamentoRepository: OrcamentoRepository
let dataSource: DataSource

describe('OrcamentoRepositoryPostgres', () => {
    beforeAll(async () => {
      testingModule = await buildTestingModule()
      usuarioFixture = testingModule.get(UsuarioFixture)
      contaFixture = testingModule.get(ContaFixture)
      orcamentoFixture = testingModule.get(OrcamentoFixture)
      orcamentoRepository = await testingModule.resolve(OrcamentoRepository)
      dataSource = testingModule.get(DataSource)
    })
  
    afterEach(async () => {
        await testingModule.get('clearDatabase')()
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    describe('Quando a funcao delete for chamada', () => {
        it('deve deletar um Orcamento', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
            const usuario: UsuarioEntity = await usuarioFixture.createFixture(fakeUsuario)
            const fakeConta = makeContaEntityFakeNew({usuario})
            const conta: ContaEntity = await contaFixture.createFixture(fakeConta)
            const fakeOrcamento = makeOrcamentoEntityFakeNew({conta})
            const orcamento: OrcamentoEntity = await orcamentoFixture.createFixture(fakeOrcamento)
            await orcamentoRepository.delete(orcamento.id)
            const result = await orcamentoRepository.findById({id: orcamento.id})
            expect(result).toBeNull()
        })
    })

    describe('Quando a funcao save for chamada', () => {
        it('deve salvar uma categoria', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
            const usuario: UsuarioEntity = await usuarioFixture.createFixture(fakeUsuario)
            const fakeConta = makeContaEntityFakeNew({usuario})
            const conta: ContaEntity = await contaFixture.createFixture(fakeConta)
            const orcamento = makeOrcamentoFake({conta: conta.toDomain()})
            const result = await orcamentoRepository.saveDomain(orcamento)
            expect(result).toBeInstanceOf(OrcamentoDomain)
            expect(result.mesReferencia).toBe(orcamento.mesReferencia)
            expect(result.limite).toBe(orcamento.limite)
        })
    })

    describe('Quando a funcao findById for chamada', () => {
        it('deve retornar uma orcamento', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
            const usuario: UsuarioEntity = await usuarioFixture.createFixture(fakeUsuario)
            const fakeConta = makeContaEntityFakeNew({usuario})
            const conta: ContaEntity = await contaFixture.createFixture(fakeConta)
            const fakeOrcamento = makeOrcamentoEntityFakeNew({conta})
            const orcamento: OrcamentoEntity = await orcamentoFixture.createFixture(fakeOrcamento)
            const result = await orcamentoRepository.findById({id: orcamento.id})
            expect(result).toBeInstanceOf(OrcamentoEntity)
            expect(result.mesReferencia).toBe(fakeOrcamento.mesReferencia)
            expect(result.limite).toBe(fakeOrcamento.limite)
        })
    })

    describe('Quando a funcao findAll for chamada', () => {
        it('deve retornar todos as orcamentos', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
            const usuario: UsuarioEntity = await usuarioFixture.createFixture(fakeUsuario)
            const fakeConta = makeContaEntityFakeNew({usuario})
            const conta: ContaEntity = await contaFixture.createFixture(fakeConta)
            const fakeOrcamento = makeOrcamentoEntityFakeNew({conta})
            const orcamento: OrcamentoEntity = await orcamentoFixture.createFixture(fakeOrcamento)
            const fakeOrcamento2 = makeOrcamentoEntityFakeNew({conta})
            const orcamento2: OrcamentoEntity = await orcamentoFixture.createFixture(fakeOrcamento2)
            const result = await orcamentoRepository.findAll()
            expect(result).toBeInstanceOf(Array)
            expect(result[0].mesReferencia).toBe(fakeOrcamento.mesReferencia)
            expect(result[0].limite).toBe(fakeOrcamento.limite)
            expect(result[1].mesReferencia).toBe(fakeOrcamento2.mesReferencia)
            expect(result[1].limite).toBe(fakeOrcamento2.limite)
        })
    })

})