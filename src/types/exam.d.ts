export interface ExamAttemptData {
  examId: number;
  userId: number;
}

export interface CreateExamData {
  title: string;
  questions: { text: string; type: string; options?: string[] }[];
}

export interface QuestionInput {
  text: string;
  type: 'text' | 'true_false' | 'multiple_choice';
  options?: string[];
}

export interface CreateExamDTO {
  title: string;
  questions: QuestionInput[];
}
