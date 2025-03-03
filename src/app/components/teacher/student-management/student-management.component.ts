// student-management.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

interface Parent {
  relationship: string;
  name: string;
  phoneNumber: string;
  email?: string;
  address: string;
}

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  admissionNumber: string;
  form: number;
  stream: string;
  dateOfBirth: string;
  enrollmentDate: string;
  address: string;
  phoneNumber?: string;
  email?: string;
  parents: Parent[];
}

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent implements OnInit {
  students: Student[] = [];
    filteredStudents: Student[] = [];
    searchTerm: string = '';
    selectedForm: number | null = null;
    selectedStream: string | null = null;
    forms: number[] = [1, 2, 3, 4];
    streams: string[] = ['A', 'B', 'C', 'D'];
    selectedStudent: Student | null = null;
    showDetails: boolean = false;

    studentForm: FormGroup;
    showAddModal: boolean = false;
    showDetailsModal: boolean = false;
    showEditModal: boolean = false;
  
    constructor( private fb: FormBuilder) {
      // Sample data - replace with actual API call
      this.studentForm = this.createStudentForm();
      this.students = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          admissionNumber: 'ADM2024001',
          dateOfBirth: '2012-01-15',
          enrollmentDate: '2020-01-15',
          address: '123 School Lane, City',
          phoneNumber: '1234567890',
          email: 'john.doe@student.school.com',
          form: 1,
          stream: 'A',
          // imageUrl: '/api/placeholder/100/100',
          parents: [
            {
              name: 'James Doe',
              phoneNumber: '0722123456',
              email: 'james.doe@email.com',
              address: '123 School Lane, City',
              relationship: 'Father'
            },
            {
              name: 'Jane Doe',
              phoneNumber: '0722123457',
              email: 'jane.doe@email.com',
              address: '123 School Lane, City',
              relationship: 'Mother'
            }
          ]
        }
      ];
      this.filteredStudents = [...this.students];
    }
  
    ngOnInit(): void {}

    

    createStudentForm(): FormGroup {
      return this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        admissionNumber: ['', Validators.required],
        form: ['', Validators.required],
        stream: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        enrollmentDate: ['', Validators.required],
        address: ['', Validators.required],
        phoneNumber: [''],
        email: ['', Validators.email],
        password: ['', Validators.required],
        parents: this.fb.array([])
      });
    }
  
    applyFilters(): void {
      this.filteredStudents = this.students.filter(student => {
        const matchesSearch = this.searchTerm ? 
          (student.firstName + ' ' + student.lastName + ' ' + student.admissionNumber)
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) : true;
        
        const matchesForm = this.selectedForm ? 
          student.form === this.selectedForm : true;
        
        const matchesStream = this.selectedStream ? 
          student.stream === this.selectedStream : true;
        
        return matchesSearch && matchesForm && matchesStream;
      });
    }
  
    clearFilters(): void {
      this.searchTerm = '';
      this.selectedForm = null;
      this.selectedStream = null;
      this.filteredStudents = [...this.students];
    }
  
    viewStudentDetails(student: Student): void {
      this.selectedStudent = student;
      this.showDetails = true;
    }
  
    closeDetails(): void {
      this.showDetails = false;
      this.selectedStudent = null;
    }
  
    formatDate(date: string): string {
      return new Date(date).toLocaleDateString();
    }

    get parentForms() {
      return this.studentForm.get('parents') as FormArray;
    }
  
    addParent() {
      const parentForm = this.fb.group({
        relationship: ['', Validators.required],
        name: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        email: ['', Validators.email],
        address: ['', Validators.required]
      });
  
      this.parentForms.push(parentForm);
    }
  
    removeParent(index: number) {
      this.parentForms.removeAt(index);
    }

    openAddModal() {
      this.studentForm.reset();
      this.parentForms.clear();
      this.addParent(); // Add at least one parent form by default
      this.showAddModal = true;
      console.log("Show details modal: ", this.showDetailsModal);
      console.log("Show add modal: ", this.showAddModal);
    }

    openDetailsModal(student: Student) {
      this.selectedStudent = student;
      this.showDetailsModal = true;
      console.log("Show: ", this.showDetailsModal);
    }

    openEditModal(student: Student) {
      this.selectedStudent = student;
      this.studentForm.patchValue({
        firstName: student.firstName,
        lastName: student.lastName,
        admissionNumber: student.admissionNumber,
        form: student.form,
        stream: student.stream,
        dateOfBirth: student.dateOfBirth,
        enrollmentDate: student.enrollmentDate,
        address: student.address,
        phoneNumber: student.phoneNumber,
        email: student.email
      });
  
      // Reset parents array
      this.parentForms.clear();
      
      // Add existing parents to form
      student.parents.forEach(parent => {
        const parentForm = this.fb.group({
          relationship: [parent.relationship, Validators.required],
          name: [parent.name, Validators.required],
          phoneNumber: [parent.phoneNumber, Validators.required],
          email: [parent.email],
          address: [parent.address, Validators.required]
        });
        this.parentForms.push(parentForm);
      });
  
      this.showEditModal = true;
    }

    onSubmit() {
      if (this.studentForm.valid) {
        const studentData = this.studentForm.value;
        if (this.showAddModal) {
          // Add new student
          this.addStudent(studentData);
        } else {
          // Update existing student
          this.updateStudent(studentData);
        }
        this.closeModals();
      } else {
        this.markFormGroupTouched(this.studentForm);
      }
    }

    addStudent(studentData: any) {
      // Call service to add student
      // After successful addition:
      this.loadStudents();
    }
  
    updateStudent(studentData: any) {
      // Call service to update student
      // After successful update:
      this.loadStudents();
    }
  
    private markFormGroupTouched(formGroup: FormGroup | FormArray) {
      Object.values(formGroup.controls).forEach(control => {
        if (control instanceof FormGroup || control instanceof FormArray) {
          this.markFormGroupTouched(control);
        } else {
          control.markAsTouched();
        }
      });
    }

    closeModals() {
      this.showAddModal = false;
      this.showDetailsModal = false;
      this.showEditModal = false;
      this.selectedStudent = null;
    }

    async deleteStudent(student: Student) {
      if (confirm('Are you sure you want to delete this student?')) {
        // Call service to delete student
        // After successful deletion:
        this.loadStudents();
      }
    }

    private loadStudents() {
      // Fetch students from service
      // For now using dummy data
      this.students = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          admissionNumber: 'AD123',
          form: 1,
          stream: 'A',
          dateOfBirth: '2005-01-01',
          enrollmentDate: '2021-01-01',
          address: '123 Main St, Nairobi',
          phoneNumber: '0712345678',
          email: '',
          parents: [
            {
              relationship: 'Father',
              name: 'Doe Father',
              phoneNumber: '071234567',
              email: '',
              address: '123 Main St, Nairobi'
            },
            {
              relationship: 'Mother',
              name: 'Doe Mother',
              phoneNumber: '071234567',
              email: '',
              address: '123 Main St, Nairobi'
            }
          ]
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Doe',
          admissionNumber: 'AD124',
          form: 1,
          stream: 'A',
          dateOfBirth: '2005-01-01',
          enrollmentDate: '2021-01-01',
          address: '123 Main St, Nairobi',
          phoneNumber: '0712345678',
          email: '',
          parents: [
            {
              relationship: 'Father',
              name: 'Doe Father',
              phoneNumber: '071234567',
              email: '',
              address: '123 Main St, Nairobi'
            },
            {
              relationship: 'Mother',
              name: 'Doe Mother',
              phoneNumber: '071234567',
              email: '',
              address: '123 Main St, Nairobi'
            }
          ]
        }
      ];
      this.applyFilters();
    }
}