import { Exam } from '@models/examModel';
import { CreateExamDTO } from '../types/exam';

export class ExamService {
  static async createExam(data: CreateExamDTO) {
    for (const q of data.questions) {
      if (q.type === 'multiple_choice') {
        if (!q.options || q.options.length === 0) {
          throw new Error(
            `For 'multiple_choice' questions, 'options' must be a non-empty array. Question: "${q.text}"`,
          );
        }
      } else {
        if (q.options && q.options.length > 0) {
          throw new Error(
            `For '${q.type}' questions, 'options' should not be provided. Question: "${q.text}"`,
          );
        }
      }
    }

    const exam = await Exam.create({
      title: data.title,
      questions: data.questions,
    });
    return exam;
  }

  static async getExamById(id: number) {
    const exam = await Exam.findById(id);
    if (!exam) {
      throw new Error('Exam not found');
    }

    const parsedExam = {
      ...exam,
      questions: exam.questions.map((q) => ({
        ...q,
        options: q.options ? JSON.parse(q.options) : null,
      })),
    };
    return parsedExam;
  }
}
