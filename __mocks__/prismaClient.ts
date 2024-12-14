// __mocks__/prismaClient.ts

const mockPrisma = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
  exam: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  examAttempt: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
  },
  question: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
  answer: {
    create: jest.fn(),
    findFirst: jest.fn(),
    count: jest.fn(),
  },
};

export const prisma = mockPrisma;
