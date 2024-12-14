import { AnswerController } from '../../src/controllers/answerController';
import { AnswerService } from '../../src/services/answerService';
import { Request, Response } from 'express';

jest.mock('@services/answerService');

describe('AnswerController', () => {
  describe('answerQuestion', () => {
    it('should answer a question successfully', async () => {
      const mockAnswer = {
        id: 1,
        attemptId: 1,
        questionId: 1,
        answer: 'Test Answer',
      };
      AnswerService.answerQuestion = jest.fn().mockResolvedValue(mockAnswer);

      const req = {
        params: { examId: '1', questionId: '1' },
        body: { attemptId: 1, answer: 'Test Answer' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await AnswerController.answerQuestion(req, res);

      expect(AnswerService.answerQuestion).toHaveBeenCalledWith({
        attemptId: 1,
        examId: 1,
        questionId: 1,
        answer: 'Test Answer',
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockAnswer);
    });

    it('should handle errors when answering a question', async () => {
      AnswerService.answerQuestion = jest
        .fn()
        .mockRejectedValue(new Error('Question not found'));

      const req = {
        params: { examId: '1', questionId: '1' },
        body: { attemptId: 1, answer: 'Test Answer' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await AnswerController.answerQuestion(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Question not found' });
    });
  });
});
