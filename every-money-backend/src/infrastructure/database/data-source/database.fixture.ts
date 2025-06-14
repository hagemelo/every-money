import { IntegerGreaterThanZeroType } from "@domain/integer-greater-than-zero.type"

export interface DatabaseFixture<EntityType> {
    createFixture: (entity: Partial<EntityType>) => Promise<EntityType>
    createFixtures: (entities: Array<Partial<EntityType>>) => Promise<EntityType[]>
    createRandomFixture: () => Promise<EntityType>
    createRandomFixtures: <NumberType extends number>(amount: IntegerGreaterThanZeroType<NumberType>) => Promise<EntityType[]>
  }
  