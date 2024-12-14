import { AnswerService } from '../../src/services/answerService';
import { Answer } from '../../src/models/answerModel';
import { ExamAttempt } from '../../src/models/examAttemptModel';
import { Question } from '../../src/models/questionModel';
import { Exam } from '../../src/models/examModel';

jest.mock('@models/answerModel');
jest.mock('@models/examAttemptModel');
jest.mock('@models/questionModel');
jest.mock('@models/examModel');

describe('AnswerService', () => {
  describe('answerQuestion', () => {
    it('should answer a question successfully', async () => {
      // Mock ExamAttempt.findById
      ExamAttempt.findById = jest.fn().mockResolvedValue({
        id: 1,
        startTime: new Date(),
      });

      // Mock Answer.findOne
      Answer.findOne = jest.fn().mockResolvedValue(null);

      // Mock Question.findById
      Question.findById = jest.fn().mockResolvedValue({
        id: 1,
        text: 'What is 2 + 2?',
        type: 'multiple_choice',
      });

      // Mock Exam.findById
      Exam.findById = jest.fn().mockResolvedValue({
        id: 1,
        title: 'Math Exam',
        questions: [{ id: 1, text: 'What is 2 + 2?', type: 'multiple_choice' }],
      });

      // Mock Answer.create
      Answer.create = jest.fn().mockResolvedValue({
        id: 1,
        attemptId: 1,
        questionId: 1,
        answer: '4',
      });

      // Call the service
      const result = await AnswerService.answerQuestion({
        attemptId: 1,
        examId: 1,
        questionId: 1,
        answer: '4',
      });

      // Verify the result
      expect(result).toEqual({
        id: 1,
        attemptId: 1,
        questionId: 1,
        answer: '4',
      });

      expect(Exam.findById).toHaveBeenCalledWith(1);
      expect(Question.findById).toHaveBeenCalledWith(1);
      expect(Answer.create).toHaveBeenCalledWith({
        attemptId: 1,
        questionId: 1,
        answer: '4',
      });
    });
  });
});
