export interface AnswerQuestionDTO {
  attemptId: number;
  examId: number;
  questionId: number;
  answer: string;
}

export interface CreateAnswerData {
  attemptId: number;
  questionId: number;
  answer: string;
}
