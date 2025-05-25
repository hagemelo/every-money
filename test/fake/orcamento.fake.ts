import { faker } from "@faker-js/faker";
import { TipoCategoriaModel } from "@domain/models/tipo-categoria.model";
import { OrcamentoModel } from "@domain/models/orcamento.model";
import { OrcamentoDomain } from "@domain/orcamento.domain";
import { OrcamentoEntity } from "@infrastructure/entities/orcamento.entity";
import { makeContaEntityFake, makeContaFake } from "./conta.fake";

export const makeOrcamentoFake = (props?: Partial<OrcamentoModel>): OrcamentoDomain => new OrcamentoDomain({
    id: props?.id || faker.number.int({ max: 100000 }),
    mesReferencia: props?.mesReferencia || faker.date.anytime().getMonth().toString() + '/' + faker.date.anytime().getFullYear().toString(),
    limite: props?.limite || faker.number.int({ max: 100000 }),
    createdAt: props?.createdAt || faker.date.anytime(),
    updatedAt: props?.updatedAt || faker.date.anytime(),
    tipoCategoria: props?.tipoCategoria || faker.helpers.enumValue(TipoCategoriaModel),
    conta: props?.conta || makeContaFake()
  })

  export const makeOrcamentoEntityFake = (props?: Partial<OrcamentoEntity>): OrcamentoEntity => OrcamentoEntity.fromDomain(new OrcamentoDomain({
    id: props?.id || faker.number.int({ max: 100000 }),
    mesReferencia: props?.mesReferencia || faker.date.anytime().getMonth().toString() + '/' + faker.date.anytime().getFullYear().toString(),
    limite: props?.limite || faker.number.int({ max: 100000 }),
    createdAt: props?.createdAt || faker.date.anytime(),
    updatedAt: props?.updatedAt || faker.date.anytime(),
    tipoCategoria: props?.tipoCategoria || faker.helpers.enumValue(TipoCategoriaModel),
    conta: props?.conta || makeContaEntityFake()
  }))