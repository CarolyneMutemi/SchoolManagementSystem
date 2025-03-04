interface TeachingAssignment {
  form: string;
  stream: string;
  subjects: string[];
}

interface Class {
  form: string;
  stream: string;
}

export interface Teacher {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  national_id: string;
  phone_number: string;
  enrollment_date: string;
  qualified_subjects: string[];
  classes_taught: TeachingAssignment[];
  is_class_teacher: boolean;
  classes_in_charge?: Class[];
}
