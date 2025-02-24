// grade-management.models.ts
export interface Student {
  id: string;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  grades: {
    [key: string]: {
      [term: string]: number;
    };
  };
}

export interface GradeColumn {
  year: number;
  term: number;
  displayText: string;
}

export interface ClassInfo {
  classId: string;
  className: string;
  subjects: string[];
}