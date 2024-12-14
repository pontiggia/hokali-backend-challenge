import { prisma } from './prismaClient';
import { ExamAttemptData } from '../types/exam';

export class ExamAttempt {
  static async create(data: ExamAttemptData) {
    return prisma.examAttempt.create({
      data: {
        examId: data.examId,
        userId: data.userId,
      },
    });
  }

  static async findByExamAndUser(examId: number, userId: number) {
    return prisma.examAttempt.findFirst({
      where: { examId, userId },
    });
  }

  static async findById(id: number) {
    return prisma.examAttempt.findUnique({
      where: { id },
      include: { exam: true },
    });
  }
}
