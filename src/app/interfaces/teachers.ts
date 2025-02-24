export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  qualifiedSubjects: string[];
  assignments: {
    class: string;
    subject: string;
  }[];
  classTeacherOf?: string;
}
