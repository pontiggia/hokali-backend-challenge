import { prisma } from './prismaClient';
import { CreateAnswerData } from '../types/answer';

export class Answer {
  static async create(data: CreateAnswerData) {
    return prisma.answer.create({
      data: {
        attemptId: data.attemptId,
        questionId: data.questionId,
        answer: data.answer,
      },
    });
  }

  static async findOne(where: { attemptId: number; questionId: number }) {
    return prisma.answer.findFirst({ where });
  }

  static async countByAttemptId(attemptId: number) {
    return prisma.answer.count({
      where: { attemptId },
    });
  }

  static async findByAttemptId(attemptId: number) {
    return prisma.answer.findMany({
      where: { attemptId },
    });
  }
}
