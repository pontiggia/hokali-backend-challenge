import { prisma } from './prismaClient';

export class Question {
  static async findById(id: number) {
    return prisma.question.findUnique({ where: { id } });
  }
}
