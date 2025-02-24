// teachers.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

interface TeachingAssignment {
  class: string;
  stream: string;
  subjects: string[];
}

interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  nationalId: string;
  phoneNumber: string;
  teacherId: string;  // Added teacher ID
  qualifiedSubjects: string[];  // Renamed for clarity
  teachingAssignments: TeachingAssignment[];  // Added teaching assignments
  isClassTeacher: boolean;
  classTeacherOf?: {
    class: string;
    stream: string;
  };
}

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[] = [];
  showModal = false;
  editingTeacher: Teacher | null = null;
  searchTerm = '';
  selectedSubjectFilter = '';
  teacherForm: FormGroup;

  subjects = ['Mathematics', 'English', 'Science', 'History', 'Geography'];
  classes = ['Form 1', 'Form 2', 'Form 3', 'Form 4'];
  streams = ['A', 'B', 'C', 'D'];

  constructor(private fb: FormBuilder) {
    this.teacherForm = this.createTeacherForm();
  }

  ngOnInit() {
    this.loadTeachers();
  }

  createTeacherForm(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nationalId: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      teacherId: ['', Validators.required],
      qualifiedSubjects: [[]],
      teachingAssignments: this.fb.array([]),
      isClassTeacher: [false],
      classTeacherOf: this.fb.group({
        class: [''],
        stream: ['']
      })
    });
  }

  get teachingAssignments() {
    return this.teacherForm.get('teachingAssignments') as FormArray;
  }

  addTeachingAssignment() {
    const assignmentForm = this.fb.group({
      class: ['', Validators.required],
      stream: ['', Validators.required],
      subjects: [[], Validators.required]
    });

    this.teachingAssignments.push(assignmentForm);
  }

  removeTeachingAssignment(index: number) {
    this.teachingAssignments.removeAt(index);
  }

  openModal(teacher?: Teacher) {
    this.editingTeacher = teacher || null;
    if (teacher) {
      // Clear existing assignments
      while (this.teachingAssignments.length) {
        this.teachingAssignments.removeAt(0);
      }
      
      // Add each teaching assignment
      teacher.teachingAssignments.forEach(assignment => {
        this.teachingAssignments.push(this.fb.group({
          class: [assignment.class],
          stream: [assignment.stream],
          subjects: [assignment.subjects]
        }));
      });

      this.teacherForm.patchValue(teacher);
    } else {
      this.teacherForm.reset();
      this.teachingAssignments.clear();
      this.addTeachingAssignment(); // Add one empty assignment by default
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingTeacher = null;
    this.teacherForm.reset();
    this.teachingAssignments.clear();
  }

  saveTeacher() {
    if (this.teacherForm.valid) {
      const teacherData = this.teacherForm.value;
      if (this.editingTeacher) {
        const index = this.teachers.findIndex(t => t.id === this.editingTeacher!.id);
        this.teachers[index] = { ...this.editingTeacher, ...teacherData };
      } else {
        this.teachers.push({
          id: this.teachers.length + 1,
          ...teacherData
        });
      }
      this.closeModal();
    }
  }

  deleteTeacher(id: number) {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.teachers = this.teachers.filter(t => t.id !== id);
    }
  }

  get filteredTeachers() {
    return this.teachers.filter(teacher => {
      const nameMatch = (teacher.firstName + ' ' + teacher.lastName)
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      
      const subjectMatch = !this.selectedSubjectFilter || 
        teacher.qualifiedSubjects.includes(this.selectedSubjectFilter);

      return nameMatch && subjectMatch;
    });
  }

  private loadTeachers() {
    // Sample data
    this.teachers = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@school.com',
        nationalId: '12345678',
        phoneNumber: '+254712345678',
        teacherId: 'TCH001',
        qualifiedSubjects: ['Mathematics', 'Physics'],
        teachingAssignments: [
          { class: 'Form 1', stream: 'A', subjects: ['Mathematics'] },
          { class: 'Form 2', stream: 'B', subjects: ['Physics'] }
        ],
        isClassTeacher: true,
        classTeacherOf: { class: 'Form 1', stream: 'A' }
      }
    ];
  }
}