module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testMatch: [
    '**/__tests__/*.steps.ts',
    '**/?(*.)+(spec|test).ts',
    '**/features/**/*.feature'
  ],
  moduleFileExtensions: ['ts', 'js'],

  //setupFilesAfterEnv: ['./features/support/world.ts']
};
