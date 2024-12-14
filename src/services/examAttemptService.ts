import { ExamService } from '@services/examService';
import { ExamAttempt } from '@models/examAttemptModel';
import { Answer } from '@models/answerModel';

export class ExamAttemptService {
  static async startExam(examId: number, userId: number) {
    await ExamService.getExamById(examId);

    const existingAttempt = await ExamAttempt.findByExamAndUser(examId, userId);
    if (existingAttempt) {
      throw new Error('User already attempted this exam');
    }

    const attempt = await ExamAttempt.create({ examId, userId });
    return attempt;
  }

  static async finishExam(examId: number, attemptId: number) {
    const attempt = await ExamAttempt.findById(attemptId);
    if (!attempt) {
      throw new Error('Attempt not found');
    }
    if (attempt.examId !== examId) {
      throw new Error('Attempt does not belong to this exam');
    }

    const now = new Date();
    const diffInMinutes =
      (now.getTime() - attempt.startTime.getTime()) / 1000 / 60;
    if (diffInMinutes > 60) {
      throw new Error('Time limit exceeded');
    }

    const exam = await ExamService.getExamById(examId);

    const totalQuestions = exam.questions.length;

    const answersCount = await Answer.countByAttemptId(attemptId);
    if (answersCount < totalQuestions) {
      throw new Error('Not all questions have been answered');
    }

    return { message: 'Exam completed successfully' };
  }

  static async getExamResults(examId: number, userId: number) {
    const attempt = await ExamAttempt.findByExamAndUser(examId, userId);

    if (!attempt) {
      throw new Error('User has not attempted this exam');
    }

    const exam = await ExamService.getExamById(examId);

    const answers = await Answer.findByAttemptId(attempt.id);

    const totalQuestions = exam.questions.length;
    const answersMap = new Map<number, string>();
    for (const ans of answers) {
      answersMap.set(ans.questionId, ans.answer);
    }

    const questionsWithAnswers = exam.questions.map((q) => ({
      ...q,
      options: q.options ? q.options : null,
      answer: answersMap.get(q.id) || null,
    }));

    const completed = answers.length === totalQuestions;

    return {
      examId,
      title: exam.title,
      questions: questionsWithAnswers,
      completed,
    };
  }
}
