import { ExamController } from '../../src/controllers/examController';
import { ExamService } from '../../src/services/examService';
import { ExamAttemptService } from '../../src/services/examAttemptService';
import { UserService } from '../../src/services/userService';
import { Request, Response } from 'express';

jest.mock('@services/examService');
jest.mock('@services/examAttemptService');
jest.mock('@services/userService');

describe('ExamController', () => {
  describe('createExam', () => {
    it('should create an exam successfully', async () => {
      const mockExam = { id: 1, title: 'Test Exam', questions: [] };
      ExamService.createExam = jest.fn().mockResolvedValue(mockExam);

      const req = { body: { title: 'Test Exam', questions: [] } } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await ExamController.createExam(req, res);

      expect(ExamService.createExam).toHaveBeenCalledWith({
        title: 'Test Exam',
        questions: [],
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockExam);
    });
  });

  describe('startExam', () => {
    it('should start an exam successfully', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
      const mockAttempt = {
        id: 1,
        examId: 1,
        userId: 1,
        startTime: new Date(),
      };
      const mockExam = { id: 1, title: 'Test Exam', questions: [] };

      UserService.getUserById = jest.fn().mockResolvedValue(mockUser);
      ExamAttemptService.startExam = jest.fn().mockResolvedValue(mockAttempt);
      ExamService.getExamById = jest.fn().mockResolvedValue(mockExam);

      const req = { params: { id: '1' } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await ExamController.startExam(req, res);

      expect(UserService.getUserById).toHaveBeenCalledWith(1);
      expect(ExamAttemptService.startExam).toHaveBeenCalledWith(1, 1);
      expect(ExamService.getExamById).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith({
        attemptId: mockAttempt.id,
        startTime: mockAttempt.startTime,
        title: mockExam.title,
        questions: mockExam.questions,
      });
    });
  });
});
