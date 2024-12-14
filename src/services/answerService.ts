import { Answer } from '@models/answerModel';
import { ExamAttempt } from '@models/examAttemptModel';
import { Exam } from '@models/examModel';
import { Question } from '@models/questionModel';
import { AnswerQuestionDTO } from '../types/answer';

export class AnswerService {
  static async answerQuestion({
    attemptId,
    examId,
    questionId,
    answer,
  }: AnswerQuestionDTO) {
    const attempt = await ExamAttempt.findById(attemptId);
    if (!attempt) {
      throw new Error('Attempt not found');
    }

    const existingAnswer = await Answer.findOne({
      attemptId: attempt.id,
      questionId,
    });
    if (existingAnswer) {
      throw new Error('Question already answered');
    }

    const exam = await Exam.findById(examId);
    if (!exam) {
      throw new Error('Exam does not exist');
    }

    const now = new Date();
    const diffInMinutes =
      (now.getTime() - attempt.startTime.getTime()) / 1000 / 60;
    if (diffInMinutes > 60) {
      throw new Error('Time limit exceeded');
    }

    const question = await Question.findById(questionId);
    if (!question) {
      throw new Error('Question not found');
    }

    const newAnswer = await Answer.create({
      attemptId: attempt.id,
      questionId: question.id,
      answer,
    });

    return newAnswer;
  }
}
