export interface QuestionAttributes {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

export async function getQuestions(): Promise<QuestionAttributes[]> {
  const response = await fetch('http://localhost:5174/questions');
  if (!response.ok)
    throw new Error(`ERROR(${response.status}): getQuestions()`);

  const data = (await response.json()) as QuestionAttributes[];
  return data;
}
