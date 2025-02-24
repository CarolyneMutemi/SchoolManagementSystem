import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Student {
  id: number;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  grades: {
    [year: string]: {
      [term: string]: {
        [subject: string]: number | null;
      }
    }
  };
}

interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  nationalId: string;
  phoneNumber: string;
  subjects: string[];
  classes: {
    className: string;
    stream: string;
    subjects: string[];
  }[];
  isClassTeacher: boolean;
  classTeacherOf?: {
    className: string;
    stream: string;
  };
}

@Component({
  selector: 'app-student-grades',
  templateUrl: './grade-management.component.html',
  styleUrls: ['./grade-management.component.css']
})
export class GradeManagementComponent implements OnInit {
  // Current teacher information (would normally come from a service)
  currentTeacher: Teacher = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@school.com',
    nationalId: 'ID12345678',
    phoneNumber: '+1234567890',
    subjects: ['Physics', 'Mathematics'],
    classes: [
      { className: 'Form 1', stream: 'A', subjects: ['Physics'] },
      { className: 'Form 2', stream: 'B', subjects: ['Physics', 'Mathematics'] }
    ],
    isClassTeacher: true,
    classTeacherOf: { className: 'Form 1', stream: 'A' }
  };

  // Sample students data
  students: Student[] = [];
  filteredStudents: Student[] = [];
  
  // Form for adding/editing grades
  gradeForm: FormGroup;
  
  // Current view settings
  selectedClass: string = '';
  selectedStream: string = '';
  selectedSubject: string = '';
  selectedYear: string = '';
  selectedTerm: string = '';
  
  // Search term
  searchTerm: string = '';
  
  // Modal controls
  showAddGradeModal: boolean = false;
  showEditGradeModal: boolean = false;
  selectedStudent: Student | null = null;
  
  // Available years and terms for dropdown
  availableYears: string[] = [];
  availableTerms: string[] = ['Term 1', 'Term 2', 'Term 3'];
  
  constructor(private fb: FormBuilder) {
    this.gradeForm = this.fb.group({
      studentId: ['', Validators.required],
      year: ['', Validators.required],
      term: ['', Validators.required],
      subject: ['', Validators.required],
      grade: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }
  
  ngOnInit(): void {
    // Generate some sample student data
    this.generateSampleData();
    
    // Set default year and term based on current date
    this.setDefaultYearAndTerm();
    
    // Generate available years (current year and 2 years back)
    const currentYear = new Date().getFullYear();
    this.availableYears = [
      (currentYear - 2).toString(),
      (currentYear - 1).toString(),
      currentYear.toString()
    ];
    
    // Default to first class and subject that the teacher teaches
    if (this.currentTeacher.classes.length > 0) {
      const firstClass = this.currentTeacher.classes[0];
      this.selectedClass = firstClass.className;
      this.selectedStream = firstClass.stream;
      
      if (firstClass.subjects.length > 0) {
        this.selectedSubject = firstClass.subjects[0];
      }
    }
    
    // Apply initial filters
    this.applyFilters();
  }
  
  generateSampleData(): void {
    // Generate 20 sample students with grades
    for (let i = 1; i <= 20; i++) {
      const student: Student = {
        id: i,
        admissionNumber: `ADM${1000 + i}`,
        firstName: `Student ${i}`,
        lastName: `Last ${i}`,
        grades: {}
      };
      
      // Generate grades for past 3 years and 3 terms
      const currentYear = new Date().getFullYear();
      for (let year = currentYear - 2; year <= currentYear; year++) {
        student.grades[year] = {};
        for (let term = 1; term <= 3; term++) {
          student.grades[year][`Term ${term}`] = {};
          for (const subject of this.currentTeacher.subjects) {
            // Random grade between 50 and 100, null for current term
            if (year < currentYear || term < this.getCurrentTerm()) {
              student.grades[year][`Term ${term}`][subject] = Math.floor(Math.random() * 51) + 50;
            } else {
              student.grades[year][`Term ${term}`][subject] = null;
            }
          }
        }
      }
      
      this.students.push(student);
    }
  }
  
  setDefaultYearAndTerm(): void {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString();
    this.selectedYear = currentYear;
    
    // Determine current term based on month
    const currentTerm = this.getCurrentTerm();
    this.selectedTerm = `Term ${currentTerm}`;
  }
  
  getCurrentTerm(): number {
    const month = new Date().getMonth() + 1; // 1-12
    if (month >= 1 && month <= 4) {
      return 1;
    } else if (month >= 5 && month <= 8) {
      return 2;
    } else {
      return 3;
    }
  }
  
  applyFilters(): void {
    // Filter students based on class and stream
    this.filteredStudents = this.students.filter(student => {
      // Apply search filter if present
      if (this.searchTerm && !this.studentMatchesSearch(student)) {
        return false;
      }
      
      // In a real app, we would filter students based on class and stream
      // For this example, we'll just return all students since we don't have class info in the student model
      return true;
    });
  }
  
  studentMatchesSearch(student: Student): boolean {
    const searchLower = this.searchTerm.toLowerCase();
    return student.firstName.toLowerCase().includes(searchLower) || 
           student.lastName.toLowerCase().includes(searchLower) || 
           student.admissionNumber.toLowerCase().includes(searchLower);
  }
  
  onClassChange(): void {
    this.applyFilters();
  }
  
  onStreamChange(): void {
    this.applyFilters();
  }
  
  onSubjectChange(): void {
    this.applyFilters();
  }
  
  onYearChange(): void {
    this.applyFilters();
  }
  
  onTermChange(): void {
    this.applyFilters();
  }
  
  onSearch(): void {
    this.applyFilters();
  }
  
  openAddGradeModal(): void {
    this.showAddGradeModal = true;
    
    // Pre-fill form with defaults
    this.gradeForm.patchValue({
      year: this.selectedYear,
      term: this.selectedTerm,
      subject: this.selectedSubject
    });
  }
  
  openEditGradeModal(student: Student): void {
    this.selectedStudent = student;
    this.showEditGradeModal = true;
    
    // Pre-fill the form
    this.gradeForm.patchValue({
      studentId: student.id,
      year: this.selectedYear,
      term: this.selectedTerm,
      subject: this.selectedSubject,
      grade: student.grades[this.selectedYear]?.[this.selectedTerm]?.[this.selectedSubject] || ''
    });
  }
  
  closeModals(): void {
    this.showAddGradeModal = false;
    this.showEditGradeModal = false;
    this.selectedStudent = null;
    this.gradeForm.reset();
  }
  
  getStudentById(id: number): Student | undefined {
    return this.students.find(student => student.id === id);
  }
  
  submitGradeForm(): void {
    if (this.gradeForm.invalid) {
      return;
    }
    
    const formValue = this.gradeForm.value;
    
    if (this.showEditGradeModal && this.selectedStudent) {
      // Update existing grade
      this.updateStudentGrade(
        this.selectedStudent,
        formValue.year,
        formValue.term,
        formValue.subject,
        formValue.grade
      );
    } else if (this.showAddGradeModal) {
      // Add new grade
      const student = this.getStudentById(formValue.studentId);
      if (student) {
        this.updateStudentGrade(
          student,
          formValue.year,
          formValue.term,
          formValue.subject,
          formValue.grade
        );
      }
    }
    
    this.closeModals();
  }
  
  updateStudentGrade(student: Student, year: string, term: string, subject: string, grade: number): void {
    // Initialize year object if it doesn't exist
    if (!student.grades[year]) {
      student.grades[year] = {};
    }
    
    // Initialize term object if it doesn't exist
    if (!student.grades[year][term]) {
      student.grades[year][term] = {};
    }
    
    // Set the grade
    student.grades[year][term][subject] = grade;
  }
  
  getStudentGrade(student: Student, year: string, term: string, subject: string): number | null | string {
    try {
      const grade = student.grades[year]?.[term]?.[subject];
      return grade !== undefined ? grade : '-';
    } catch (error) {
      return '-';
    }
  }
  
  getStudentFullName(student: Student): string {
    return `${student.firstName} ${student.lastName}`;
  }
  
  getAvailableSubjects(): string[] {
    const classObj = this.currentTeacher.classes.find(
      c => c.className === this.selectedClass && c.stream === this.selectedStream
    );
    
    return classObj ? classObj.subjects : [];
  }
  
  getAvailableClasses(): { className: string, stream: string }[] {
    return this.currentTeacher.classes.map(c => ({
      className: c.className,
      stream: c.stream
    }));
  }
}