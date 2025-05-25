import { faker } from "@faker-js/faker";
import { CategoriaDomain } from "@domain/categoria.domain";
import { TransacaoEntity } from "@infrastructure/entities/transacao.entity";
import { TransacaoModel } from "@domain/models/transacao.model";
import { TipoTransacaoModel } from "@domain/models/tipo-transacao.model";
import { TransacaoDomain } from "@domain/transacao.domain";
import { makeCategoriaEntityFake, makeCategoriaFake } from "./categoria.fake";
import { makeContaEntityFake, makeContaFake } from "./conta.fake";

export const makeTransacaoFake = (props?: Partial<TransacaoModel>): TransacaoDomain => new TransacaoDomain({
    id: props?.id || faker.number.int({ max: 100000 }),
    descricao: props?.descricao || faker.lorem.words({ min: 1, max: 10 }),
    valor: props?.valor || faker.number.int({ max: 100000 }),
    data: props?.data || faker.date.anytime(),
    tipo: props?.tipo || faker.helpers.enumValue(TipoTransacaoModel),
    categoria: props?.categoria || makeCategoriaFake(),
    conta: props?.conta || makeContaFake(),
    createdAt: props?.createdAt || faker.date.anytime(),
    updatedAt: props?.updatedAt || faker.date.anytime()
  })

  export const makeTransacaoEntityFake = (props?: Partial<TransacaoEntity>): TransacaoEntity => TransacaoEntity.fromDomain(new TransacaoDomain({
    id: props?.id || faker.number.int({ max: 100000 }),
    descricao: props?.descricao || faker.lorem.words({ min: 1, max: 10 }),
    valor: props?.valor || faker.number.int({ max: 100000 }),
    data: props?.data || faker.date.anytime(),
    tipo: props?.tipo || faker.helpers.enumValue(TipoTransacaoModel),
    categoria: props?.categoria || makeCategoriaEntityFake(),
    conta: props?.conta || makeContaEntityFake(),
    createdAt: props?.createdAt || faker.date.anytime(),
    updatedAt: props?.updatedAt || faker.date.anytime()
  }))

  export const makeTransacaoEntityFakeNew = (props?: Partial<TransacaoEntity>): TransacaoEntity => TransacaoEntity.fromDomain(new TransacaoDomain({
    id: null,
    descricao: props?.descricao || faker.lorem.words({ min: 1, max: 10 }),
    valor: props?.valor || faker.number.int({ max: 100000 }),
    data: props?.data || faker.date.anytime(),
    tipo: props?.tipo || faker.helpers.enumValue(TipoTransacaoModel),
    categoria: props?.categoria || makeCategoriaEntityFake(),
    conta: props?.conta || makeContaEntityFake(),
    createdAt: props?.createdAt || faker.date.anytime(),
    updatedAt: props?.updatedAt || faker.date.anytime()
  }))