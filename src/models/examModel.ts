import { prisma } from './prismaClient';
import { CreateExamData } from '../types/exam';

export class Exam {
  static async create(data: CreateExamData) {
    const exam = await prisma.exam.create({
      data: {
        title: data.title,
        questions: {
          create: data.questions.map((q) => ({
            text: q.text,
            type: q.type,
            options: q.options ? JSON.stringify(q.options) : null,
          })),
        },
      },
      include: { questions: true },
    });

    const parsedExam = {
      ...exam,
      questions: exam.questions.map((q) => ({
        ...q,
        options: q.options ? JSON.parse(q.options) : null,
      })),
    };
    return parsedExam;
  }

  static async findById(id: number) {
    return prisma.exam.findUnique({
      where: { id },
      include: { questions: true },
    });
  }
}
