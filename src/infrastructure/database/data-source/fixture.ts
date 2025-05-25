import { type DataSource } from 'typeorm'
import { DatabaseFixture } from './database.fixture'
import { IntegerGreaterThanZeroType } from '@domain/integer-greater-than-zero.type'

type Props<ReturnType> = {
    createDefault: () => ReturnType
    dataSource: DataSource
    repositoryName: string
  }

  export abstract class Fixture<EntityType> implements DatabaseFixture<EntityType> {

    protected constructor (private readonly props: Props<EntityType>) {}

  public async createFixture (entity: Partial<EntityType>): Promise<EntityType> {
    return await this.createPostgresFixture(entity)
  }

  public async createFixtures (entities: Array<Partial<EntityType>>): Promise<EntityType[]> {
    return await this.createPostgresFixture(entities)
  }

  public async createRandomFixture (): Promise<EntityType> {
    return await this.createPostgresFixture()
  }

  public async createRandomFixtures <NumberType extends number>(amount: IntegerGreaterThanZeroType<NumberType>): Promise<EntityType[]> {
    return await this.createPostgresFixture(amount)
  }

  private async createPostgresFixture (): Promise<EntityType>
  private async createPostgresFixture (entity: Partial<EntityType>): Promise<EntityType>
  private async createPostgresFixture (entities: Array<Partial<EntityType>>): Promise<EntityType[]>
  private async createPostgresFixture <NumberType extends number>(amount: IntegerGreaterThanZeroType<NumberType>): Promise<EntityType[]>
  private async createPostgresFixture <NumberType extends number>(entityOrEntitiesOrAmount?: IntegerGreaterThanZeroType<NumberType> | Partial<EntityType> | Array<Partial<EntityType>>): Promise<EntityType | EntityType[]> {
    const { createDefault, dataSource, repositoryName } = this.props
    const repository = dataSource.getRepository(repositoryName)

    if (typeof entityOrEntitiesOrAmount === 'number') {
      const entities: EntityType[] = []

      for (let i = 0; i < entityOrEntitiesOrAmount; i++) {
        entities.push(repository.create((createDefault() as any)) as EntityType)
      }

      await dataSource.manager.save(entities)

      return entities
    }

    if (!Array.isArray(entityOrEntitiesOrAmount)) {
      const entity = repository.create({
        ...(createDefault() as any),
        ...entityOrEntitiesOrAmount
      }) as EntityType
      await dataSource.manager.save(entity)

      return entity
    }

    const entities = entityOrEntitiesOrAmount.map(entity => repository.create({
      ...(createDefault() as any),
      ...entity
    }) as EntityType)
    await dataSource.manager.save(entities)

    return entities
  }
  }