// teachers.interface.ts
export interface Teacher {
  nationalId: string;
  firstName: string;
  lastName: string;
  email: string;
  subjects: string[];
  dateJoined?: Date;
}
