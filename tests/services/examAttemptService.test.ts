import { ExamAttemptService } from '../../src/services/examAttemptService';
import { ExamAttempt } from '../../src/models/examAttemptModel';
import { Answer } from '../../src/models/answerModel';
import { ExamService } from '../../src/services/examService';

jest.mock('@models/examAttemptModel');
jest.mock('@models/answerModel');
jest.mock('@services/examService');

describe('ExamAttemptService', () => {
  describe('startExam', () => {
    it('should throw an error if user already attempted the exam', async () => {
      ExamService.getExamById = jest
        .fn()
        .mockResolvedValue({ id: 1, title: 'Test Exam' });
      ExamAttempt.findByExamAndUser = jest.fn().mockResolvedValue({ id: 1 });

      await expect(ExamAttemptService.startExam(1, 1)).rejects.toThrow(
        'User already attempted this exam',
      );

      expect(ExamService.getExamById).toHaveBeenCalledWith(1);
      expect(ExamAttempt.findByExamAndUser).toHaveBeenCalledWith(1, 1);
    });

    it('should start an exam if no attempt exists', async () => {
      ExamService.getExamById = jest
        .fn()
        .mockResolvedValue({ id: 1, title: 'Test Exam' });
      ExamAttempt.findByExamAndUser = jest.fn().mockResolvedValue(null);
      ExamAttempt.create = jest
        .fn()
        .mockResolvedValue({ id: 1, examId: 1, userId: 1 });

      const result = await ExamAttemptService.startExam(1, 1);

      expect(result).toEqual({ id: 1, examId: 1, userId: 1 });
      expect(ExamAttempt.create).toHaveBeenCalledWith({ examId: 1, userId: 1 });
    });
  });

  describe('finishExam', () => {
    it('should throw an error if not all questions are answered', async () => {
      ExamAttempt.findById = jest.fn().mockResolvedValue({
        id: 1,
        examId: 1,
        startTime: new Date(),
      });
      ExamService.getExamById = jest.fn().mockResolvedValue({
        id: 1,
        title: 'Test Exam',
        questions: [{ id: 1 }, { id: 2 }],
      });
      Answer.countByAttemptId = jest.fn().mockResolvedValue(1);

      await expect(ExamAttemptService.finishExam(1, 1)).rejects.toThrow(
        'Not all questions have been answered',
      );

      expect(ExamAttempt.findById).toHaveBeenCalledWith(1);
      expect(Answer.countByAttemptId).toHaveBeenCalledWith(1);
    });

    it('should complete the exam if all questions are answered', async () => {
      ExamAttempt.findById = jest.fn().mockResolvedValue({
        id: 1,
        examId: 1,
        startTime: new Date(),
      });
      ExamService.getExamById = jest.fn().mockResolvedValue({
        id: 1,
        title: 'Test Exam',
        questions: [{ id: 1 }, { id: 2 }],
      });
      Answer.countByAttemptId = jest.fn().mockResolvedValue(2);

      const result = await ExamAttemptService.finishExam(1, 1);

      expect(result).toEqual({ message: 'Exam completed successfully' });
      expect(Answer.countByAttemptId).toHaveBeenCalledWith(1);
    });
  });
});
