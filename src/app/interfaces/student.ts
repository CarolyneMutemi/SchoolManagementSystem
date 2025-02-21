// student.model.ts
export interface Parent {
    name: string;
    phoneNumber: string;
    email?: string;
    address: string;
    relationship: 'Father' | 'Mother' | 'Guardian';
  }
  
  export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    admissionNumber: string;
    dateOfBirth: string;
    enrollmentDate: string;
    address: string;
    phoneNumber?: string;
    email?: string;
    form: number;
    stream: string;
    // imageUrl?: string;
    parents: Parent[];
  }