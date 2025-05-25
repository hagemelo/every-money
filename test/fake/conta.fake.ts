import { faker } from "@faker-js/faker";
import { ContaEntity } from "@infrastructure/entities/conta.entity";
import { ContaModel } from "@domain/models/conta.model";
import { TipoContaModel } from "@domain/models/tipo-conta.model";
import { ContaDomain } from "@domain/conta.domain";
import { makeUsuarioEntityFake, makeUsuarioFake } from "./usuario.fake";

export const makeContaFake = (props?: Partial<ContaModel>): ContaDomain => new ContaDomain({
    id: props?.id || faker.number.int({ max: 100000 }),
    nome: props?.nome || faker.lorem.words({ min: 1, max: 10 }),
    saldoRealizado: props?.saldoRealizado || faker.number.int({ max: 100000 }),
    saldoPrevisto: props?.saldoPrevisto || faker.number.int({ max: 100000 }),
    tipoConta: props?.tipoConta || faker.helpers.enumValue(TipoContaModel),
    usuario: props?.usuario || makeUsuarioFake(),
    createdAt: props?.createdAt || faker.date.anytime(),
    updatedAt: props?.updatedAt || faker.date.anytime()
  })

  export const makeContaEntityFake = (props?: Partial<ContaEntity>): ContaEntity => ContaEntity.fromDomain(new ContaDomain({
    id: props?.id || faker.number.int({ max: 100000 }),
    nome: props?.nome || faker.lorem.words({ min: 1, max: 10 }),
    saldoRealizado: props?.saldoRealizado || faker.number.int({ max: 100000 }),
    saldoPrevisto: props?.saldoPrevisto || faker.number.int({ max: 100000 }),
    tipoConta: props?.tipoConta || faker.helpers.enumValue(TipoContaModel),
    usuario: props?.usuario || makeUsuarioEntityFake(),
    createdAt: props?.createdAt || faker.date.anytime(),
    updatedAt: props?.updatedAt || faker.date.anytime()
  }))

  export const makeContaEntityFakeNew = (props?: Partial<ContaEntity>): ContaEntity => ContaEntity.fromDomain(new ContaDomain({
    id: null,
    nome: props?.nome || faker.lorem.words({ min: 1, max: 10 }),
    saldoRealizado: props?.saldoRealizado || faker.number.int({ max: 100000 }),
    saldoPrevisto: props?.saldoPrevisto || faker.number.int({ max: 100000 }),
    tipoConta: props?.tipoConta || faker.helpers.enumValue(TipoContaModel),
    usuario: props?.usuario || makeUsuarioEntityFake(),
    createdAt: props?.createdAt || faker.date.anytime(),
    updatedAt: props?.updatedAt || faker.date.anytime()
  }))