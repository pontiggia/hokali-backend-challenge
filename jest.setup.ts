// jest.setup.ts
jest.mock('./src/models/prismaClient', () =>
  require('./__mocks__/prismaClient'),
);
