import { UsuarioModel } from "@domain/models/usuario.model";
import { UsuarioDomain } from "@domain/usuario.domain";
import { faker } from "@faker-js/faker";
import { UsuarioEntity } from "@infrastructure/entities/usuario.entity";

export const makeUsuarioFake = (props?: Partial<UsuarioModel>): UsuarioDomain => new UsuarioDomain({
    id: props?.id || faker.number.int({ max: 100000 }),
    nome: props?.nome || faker.lorem.words({ min: 1, max: 10 }),
    email: props?.email ||  faker.lorem.words({ min: 1, max: 10 }),
    senha: props?.senha || faker.lorem.words({ min: 1, max: 10 }),
    createdAt: props?.createdAt || faker.date.anytime(),
    updatedAt: props?.updatedAt || faker.date.anytime(),
    contas: props?.contas || [],
    categorias: props?.categorias || []
  })

  export const makeUsuarioEntityFake = (props?: Partial<UsuarioEntity>): UsuarioEntity => UsuarioEntity.fromDomain(new UsuarioDomain({
    id: props?.id || faker.number.int({ max: 100000 }),
    nome: props?.nome || faker.lorem.words({ min: 1, max: 10 }),
    email: props?.email ||  faker.lorem.words({ min: 1, max: 10 }),
    senha: props?.senha || faker.lorem.words({ min: 1, max: 10 }),
    createdAt: props?.createdAt || faker.date.anytime(),
    updatedAt: props?.updatedAt || faker.date.anytime()
  }))

  export const makeUsuarioEntityFakeNew = (props?: Partial<UsuarioEntity>): UsuarioEntity => UsuarioEntity.fromDomain(new UsuarioDomain({
    id: null,
    nome: props?.nome || faker.lorem.words({ min: 1, max: 10 }),
    email: props?.email ||  faker.lorem.words({ min: 1, max: 10 }),
    senha: props?.senha || faker.lorem.words({ min: 1, max: 10 }),
    createdAt: props?.createdAt || faker.date.anytime(),
    updatedAt: props?.updatedAt || faker.date.anytime()
  }))