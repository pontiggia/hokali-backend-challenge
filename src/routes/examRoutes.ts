import { Router } from 'express';
import { ExamController } from '@controllers/examController';
import { AnswerController } from '@controllers/answerController';

export const examRoutes = Router();

examRoutes.post('/', ExamController.createExam);
examRoutes.post('/:id/start', ExamController.startExam);
examRoutes.post('/:id/finish', ExamController.finishExam);
examRoutes.post(
  '/:examId/questions/:questionId/answer',
  AnswerController.answerQuestion,
);

examRoutes.get('/:id/results', ExamController.getExamResults);
