// import { Component } from '@angular/core';

// interface Grade {
//   letter: string;
//   minScore: number;
//   maxScore: number;
//   points: number;
// }

// @Component({
//   selector: 'app-system',
//   templateUrl: './system.component.html',
//   styleUrls: ['./system.component.css']
// })
// export class SystemComponent {
//   tabs = [
//     { key: 'grades', label: 'Grades', icon: 'fas fa-graduation-cap' },
//     { key: 'subjects', label: 'Subjects', icon: 'fas fa-book' },
//     { key: 'forms', label: 'Forms', icon: 'fas fa-layer-group' },
//     { key: 'streams', label: 'Streams', icon: 'fas fa-stream' }
//   ];
//   activeTab: string = 'grades';

//   // Data arrays
//   grades: Grade[] = [
//     { letter: 'A', minScore: 80, maxScore: 100, points: 12 },
//     { letter: 'A-', minScore: 75, maxScore: 79, points: 11 }
//   ];
//   subjects: string[] = ['Mathematics', 'English', 'Physics'];
//   forms: string[] = ['Form 1', 'Form 2', 'Form 3', 'Form 4'];
//   streams: string[] = ['East', 'West'];

//   // Modal controls for Grade
//   showGradeModal = false;
//   gradeModal: Grade = { letter: '', minScore: 0, maxScore: 0, points: 0 };
//   gradeEditIndex: number = -1;

//   // Modal controls for Subject
//   showSubjectModal = false;
//   subjectModal: string = '';
//   subjectEditIndex: number = -1;

//   // Modal controls for Form
//   showFormModal = false;
//   formModal: string = '';
//   formEditIndex: number = -1;

//   // Modal controls for Stream
//   showStreamModal = false;
//   streamModal: string = '';
//   streamEditIndex: number = -1;

//   // Grade Modal functions
//   openGradeModal(grade?: Grade, index?: number): void {
//     if (grade && index !== undefined) {
//       this.gradeModal = { ...grade };
//       this.gradeEditIndex = index;
//     } else {
//       this.gradeModal = { letter: '', minScore: 0, maxScore: 0, points: 0 };
//       this.gradeEditIndex = -1;
//     }
//     this.showGradeModal = true;
//   }
//   closeGradeModal(): void {
//     this.showGradeModal = false;
//   }
//   saveGradeModal(): void {
//     if (this.gradeEditIndex >= 0) {
//       this.grades[this.gradeEditIndex] = { ...this.gradeModal };
//     } else {
//       this.grades.push({ ...this.gradeModal });
//     }
//     this.closeGradeModal();
//   }
//   deleteGrade(index: number): void {
//     this.grades.splice(index, 1);
//   }

//   // Subject Modal functions
//   openSubjectModal(subject?: string, index?: number): void {
//     if (subject !== undefined && index !== undefined) {
//       this.subjectModal = subject;
//       this.subjectEditIndex = index;
//     } else {
//       this.subjectModal = '';
//       this.subjectEditIndex = -1;
//     }
//     this.showSubjectModal = true;
//   }
//   closeSubjectModal(): void {
//     this.showSubjectModal = false;
//   }
//   saveSubjectModal(): void {
//     if (this.subjectEditIndex >= 0) {
//       this.subjects[this.subjectEditIndex] = this.subjectModal;
//     } else {
//       this.subjects.push(this.subjectModal);
//     }
//     this.closeSubjectModal();
//   }
//   deleteSubject(index: number): void {
//     this.subjects.splice(index, 1);
//   }

//   // Form Modal functions
//   openFormModal(form?: string, index?: number): void {
//     if (form !== undefined && index !== undefined) {
//       this.formModal = form;
//       this.formEditIndex = index;
//     } else {
//       this.formModal = '';
//       this.formEditIndex = -1;
//     }
//     this.showFormModal = true;
//   }
//   closeFormModal(): void {
//     this.showFormModal = false;
//   }
//   saveFormModal(): void {
//     if (this.formEditIndex >= 0) {
//       this.forms[this.formEditIndex] = this.formModal;
//     } else {
//       this.forms.push(this.formModal);
//     }
//     this.closeFormModal();
//   }
//   deleteForm(index: number): void {
//     this.forms.splice(index, 1);
//   }

//   // Stream Modal functions
//   openStreamModal(stream?: string, index?: number): void {
//     if (stream !== undefined && index !== undefined) {
//       this.streamModal = stream;
//       this.streamEditIndex = index;
//     } else {
//       this.streamModal = '';
//       this.streamEditIndex = -1;
//     }
//     this.showStreamModal = true;
//   }
//   closeStreamModal(): void {
//     this.showStreamModal = false;
//   }
//   saveStreamModal(): void {
//     if (this.streamEditIndex >= 0) {
//       this.streams[this.streamEditIndex] = this.streamModal;
//     } else {
//       this.streams.push(this.streamModal);
//     }
//     this.closeStreamModal();
//   }
//   deleteStream(index: number): void {
//     this.streams.splice(index, 1);
//   }
// }

// system-config.component.ts
import { Component, OnInit } from '@angular/core';

interface Grade {
  id: number;
  letter: string;
  minScore: number;
  maxScore: number;
}

interface Subject {
  id: number;
  name: string;
  code: string;
}

interface Form {
  id: number;
  name: string;
  level: number;
}

interface Stream {
  id: number;
  name: string;
}

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css'],
})
export class SystemComponent implements OnInit {
  grades: Grade[] = [];
  subjects: Subject[] = [];
  forms: Form[] = [];
  streams: Stream[] = [];
  
  showModal = false;
  modalType = '';
  modalTitle = '';
  currentItem: any = {};

  ngOnInit() {
    // Initialize with sample data
    this.grades = [
      { id: 1, letter: 'A', minScore: 80, maxScore: 100 },
      { id: 2, letter: 'B', minScore: 70, maxScore: 79 },
    ];

    this.subjects = [
      { id: 1, name: 'Mathematics', code: 'MATH' },
      { id: 2, name: 'English', code: 'ENG' },
    ];

    this.forms = [
      { id: 1, name: 'Form One', level: 1 },
      { id: 2, name: 'Form Two', level: 2 },
    ];

    this.streams = [
      { id: 1, name: 'East' },
      { id: 2, name: 'West' },
    ];
  }

  openModal(type: string) {
    this.modalType = type;
    this.currentItem = {};
    this.showModal = true;
    
    switch(type) {
      case 'grade':
        this.modalTitle = 'Add Grade';
        break;
      case 'subject':
        this.modalTitle = 'Add Subject';
        break;
      case 'form':
        this.modalTitle = 'Add Form';
        break;
      case 'stream':
        this.modalTitle = 'Add Stream';
        break;
    }
  }

  editGrade(grade: Grade) {
    this.modalType = 'grade';
    this.currentItem = { ...grade };
    this.showModal = true;
    this.modalTitle = 'Edit Grade';
  }

  editSubject(subject: Subject) {
    this.modalType = 'subject';
    this.currentItem = { ...subject };
    this.showModal = true;
    this.modalTitle = 'Edit Subject';
  }

  editForm(form: Form) {
    this.modalType = 'form';
    this.currentItem = { ...form };
    this.showModal = true;
    this.modalTitle = 'Edit Form';
  }

  editStream(stream: Stream) {
    this.modalType = 'stream';
    this.currentItem = { ...stream };
    this.showModal = true;
    this.modalTitle = 'Edit Stream';
  }

  deleteGrade(grade: Grade) {
    this.grades = this.grades.filter(g => g.id !== grade.id);
  }

  deleteSubject(subject: Subject) {
    this.subjects = this.subjects.filter(s => s.id !== subject.id);
  }

  deleteForm(form: Form) {
    this.forms = this.forms.filter(f => f.id !== form.id);
  }

  deleteStream(stream: Stream) {
    this.streams = this.streams.filter(s => s.id !== stream.id);
  }

  submitForm() {
    if (this.currentItem.id) {
      switch(this.modalType) {
        case 'grade':
          this.grades = this.grades.map(g => g.id === this.currentItem.id ? this.currentItem : g);
          break;
        case 'subject':
          this.subjects = this.subjects.map(s => s.id === this.currentItem.id ? this.currentItem : s);
          break;
        case 'form':
          this.forms = this.forms.map(f => f.id === this.currentItem.id ? this.currentItem : f);
          break;
        case 'stream':
          this.streams = this.streams.map(s => s.id === this.currentItem.id ? this.currentItem : s);
          break;
      }
    } else {
      // const id = this[`${this.modalType}s`].length + 1;
      // this.currentItem.id = id;
      // this[`${this.modalType}s`].push(this.currentItem);
      console.log('Current item:', this.currentItem);
    }

    this.showModal = false;
  }

  closeModal() {
    this.showModal = false;
  }
}