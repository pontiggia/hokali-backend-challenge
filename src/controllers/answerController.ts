import { Request, Response } from 'express';
import { AnswerService } from '@services/answerService';

export class AnswerController {
  static async answerQuestion(req: Request, res: Response) {
    try {
      const { examId, questionId } = req.params;
      const { attemptId, answer } = req.body;

      const result = await AnswerService.answerQuestion({
        attemptId: Number(attemptId),
        examId: Number(examId),
        questionId: Number(questionId),
        answer,
      });
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
