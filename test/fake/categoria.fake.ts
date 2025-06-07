import { faker } from "@faker-js/faker";
import { CategoriaDomain } from "@domain/categoria.domain";
import { CategoriaEntity } from "@infrastructure/entities/categoria.entity";
import { CategoriaModel } from "@domain/models/categoria.model";
import { TipoCategoriaModel } from "@domain/models/tipo-categoria.model";
import { ClassificacaoCategoriaModel } from "@domain/models/classificacao-categoria.model";
import { makeUsuarioEntityFake, makeUsuarioFake } from "./usuario.fake";

export const makeCategoriaFake = (props?: Partial<CategoriaModel>): CategoriaDomain => new CategoriaDomain({
    id: props?.id || faker.number.int({ max: 100000 }),
    nome: props?.nome || faker.lorem.words({ min: 1, max: 10 }),
    tipo: props?.tipo || faker.helpers.enumValue(TipoCategoriaModel),
    classificacao: props?.classificacao || faker.helpers.enumValue(ClassificacaoCategoriaModel),
    createdAt: props?.createdAt || faker.date.anytime(),
    updatedAt: props?.updatedAt || faker.date.anytime(),
    usuario: props?.usuario || makeUsuarioFake(),
    transacoes: props?.transacoes || []
  })

  export const makeCategoriaEntityFake = (props?: Partial<CategoriaEntity>): CategoriaEntity => CategoriaEntity.fromDomain(new CategoriaDomain({
    id: props?.id || faker.number.int({ max: 100000 }),
    nome: props?.nome || faker.lorem.words({ min: 1, max: 10 }),
    tipo: props?.tipo || faker.helpers.enumValue(TipoCategoriaModel),
    classificacao: props?.classificacao || faker.helpers.enumValue(ClassificacaoCategoriaModel),
    createdAt: props?.createdAt || faker.date.anytime(),
    updatedAt: props?.updatedAt || faker.date.anytime(),
    usuario: props?.usuario || makeUsuarioEntityFake()
  }))

  export const makeCategoriaEntityFakeNew = (props?: Partial<CategoriaEntity>): CategoriaEntity => CategoriaEntity.fromDomain(new CategoriaDomain({
    id: null,
    nome: props?.nome || faker.lorem.words({ min: 1, max: 10 }),
    tipo: props?.tipo || faker.helpers.enumValue(TipoCategoriaModel),
    classificacao: props?.classificacao || faker.helpers.enumValue(ClassificacaoCategoriaModel),
    createdAt: props?.createdAt || faker.date.anytime(),
    updatedAt: props?.updatedAt || faker.date.anytime(),
    usuario: props?.usuario || makeUsuarioEntityFake()
  }))