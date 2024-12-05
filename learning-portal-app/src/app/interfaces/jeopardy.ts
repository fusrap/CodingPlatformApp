export interface JeopardyCell {
  value: number;
  question: string;
  answer: string;
}

export interface Jeopardy {
  title: string;
  description: string;
  subjects: string[];         
  grid: JeopardyCell[][];            
}
