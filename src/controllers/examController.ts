import { Request, Response } from 'express';
import { ExamService } from '@services/examService';
import { ExamAttemptService } from '@services/examAttemptService';
import { UserService } from '@services/userService';

export class ExamController {
  static async createExam(req: Request, res: Response) {
    try {
      const { title, questions } = req.body;

      const exam = await ExamService.createExam({ title, questions });
      res.status(201).json(exam);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async startExam(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const examId = Number(id);

      const userId = 1;

      const user = await UserService.getUserById(userId);
      if (!user) {
        throw new Error('You must be logged in to start an exam');
      }

      const attempt = await ExamAttemptService.startExam(examId, userId);
      const exam = await ExamService.getExamById(examId);

      res.json({
        attemptId: attempt.id,
        startTime: attempt.startTime,
        title: exam.title,
        questions: exam.questions,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async finishExam(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { attemptId } = req.body;

      const examId = Number(id);
      const attemptIdNum = Number(attemptId);

      const result = await ExamAttemptService.finishExam(examId, attemptIdNum);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getExamResults(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const examId = Number(id);
      const userId = Number(req.query.userId);

      if (!userId) {
        throw new Error('userId query parameter is required');
      }

      const user = await UserService.getUserById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const results = await ExamAttemptService.getExamResults(examId, userId);
      res.json(results);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
