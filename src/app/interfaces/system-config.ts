export interface Grade {
  _id?: string;
  letter: string;
  min_score: number;
  max_score: number;
}

export interface Subject {
  _id?: string;
  name: string;
  code: string;
}

export interface Form {
  _id?: string;
  level: number;
}

export interface Stream {
  _id?: string;
  name: string;
}