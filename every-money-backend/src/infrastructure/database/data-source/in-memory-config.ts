export const inMemoryDatabaseConfig = {
    database: 'test-db',
    dropSchema: true,
    entities: [
      'src/infrastructure/entities/*.entity.ts'
    ],
    type: 'postgres',
  }
  export default inMemoryDatabaseConfig