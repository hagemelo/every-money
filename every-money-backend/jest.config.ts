module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>'],
    testTimeout: 20000,
    modulePaths: ['<rootDir>'],
    testMatch: ['<rootDir>/**/**/**.test.ts'],
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    moduleNameMapper: {
      '^@domain/(.*)$': '<rootDir>/src/domain/$1',
      '^@application/(.*)$': '<rootDir>/src/application/$1',
      '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
      '^~/(.*)$': '<rootDir>/test/$1',
      '^@\/src\/(.*)$': '<rootDir>/src/$1',
      '^@test/(.*)$': '<rootDir>/test/$1'
    },
    collectCoverageFrom: [
      '<rootDir>/src/**/*.ts',
      '!<rootDir>/src/**/config/*',
      '!<rootDir>/src/**/entities/*',
      '!<rootDir>/src/**/healthy/**',
      '!<rootDir>/src/sew-backend.module.ts',
      '!<rootDir>/src/main.ts',
      '!<rootDir>/src/shared/guards/*',
      '!<rootDir>/src/infrastructure/database/data-source/*',
      '!<rootDir>/src/infrastructure/database/database.module.ts',
         ],
    modulePathIgnorePatterns: ['<rootDir>/src/infrastructure/database/migration/*'],
    coverageDirectory: 'coverage',
    coverageProvider: 'babel',
    coverageThreshold: {
      global: {
        statements: 98,
        branches: 100,
        functions: 98,
        lines: 97,
      },
    }
  }