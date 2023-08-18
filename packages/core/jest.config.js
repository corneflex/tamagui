const base = require('../../jest.config.base')
module.exports = {
  ...base,
  preset: 'ts-jest',
  testMatch: ['**/?(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|tsx)?$': ['ts-jest', { tsconfig: 'tsconfig.spec.json' }],
  },
}
