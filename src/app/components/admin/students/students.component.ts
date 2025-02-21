// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-students',
//   templateUrl: './students.component.html',
//   styleUrls: ['./students.component.css']
// })
// export class StudentsComponent {

// }

// student.component.ts
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/interfaces/student';

@Component({
  selector: 'app-student',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchTerm: string = '';
  selectedForm: number | null = null;
  selectedStream: string | null = null;
  forms: number[] = [1, 2, 3, 4];
  streams: string[] = ['A', 'B', 'C', 'D'];
  selectedStudent: Student | null = null;
  showDetails: boolean = false;

  constructor() {
    // Sample data - replace with actual API call
    this.students = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        admissionNumber: 'ADM2024001',
        dateOfBirth: '2008-05-15',
        enrollmentDate: '2024-01-15',
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
}