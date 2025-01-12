export interface JeopardyCell {
  value: number;
  question: string;
  answer: string;
}

export interface Jeopardy {
  id: number;
  title: string;
  description: string;
  subjects: string[];         
  grid: JeopardyCell[][];            
}




