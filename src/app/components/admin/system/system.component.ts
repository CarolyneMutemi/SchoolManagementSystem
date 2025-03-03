import { Component, OnInit } from '@angular/core';

import { SystemConfigService } from 'src/app/services/admin/system-config.service';
import { Grade, Subject, Form, Stream } from 'src/app/interfaces/system-config';


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

  constructor(private systemConfigService: SystemConfigService) {}

  ngOnInit() {
    this.systemConfigService.getGrades().subscribe((grades: Grade[]) => {
      this.grades = grades;
    });

    this.systemConfigService.getSubjects().subscribe((subjects: Subject[]) => {
      this.subjects = subjects;
    });

    this.systemConfigService.getForms().subscribe((forms: Form[]) => {
      this.forms = forms;
    });

    this.systemConfigService.getStreams().subscribe((streams: Stream[]) => {
      const capitalizedStreams = streams.map(stream => {
        stream.name = stream.name.charAt(0).toUpperCase() + stream.name.slice(1);
        return stream;
      });
      this.streams = capitalizedStreams;
    });
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
    this.systemConfigService.deleteGrade(grade).subscribe(
      () => {
        this.grades = this.grades.filter(g => g._id !== grade._id);
      },
      (error) => {
        console.error('Error deleting grade:', error);
        alert('Grade has students. Cannot delete');
      }
    );
  }

  deleteSubject(subject: Subject) {
    this.systemConfigService.deleteSubject(subject).subscribe(
      () => {
        this.subjects = this.subjects.filter(s => s._id !== subject._id);
      },
      (error) => {
        console.error('Error deleting subject:', error);
        alert('Subject has students. Cannot delete');
      }
    );
  }

  deleteForm(form: Form) {
    this.systemConfigService.deleteForm(form).subscribe(
      () => {
        this.forms = this.forms.filter(f => f._id !== form._id);
      },
      (error) => {
        console.error('Error deleting form:', error);
        alert('Form has students. Cannot delete');
      }
    );
  }

  deleteStream(stream: Stream) {
    this.systemConfigService.deleteStream(stream).subscribe(
      () => {
        this.streams = this.streams.filter(s => s._id !== stream._id);
      },
      (error) => {
        console.error('Error deleting stream:', error);
        alert('Stream has students. Cannot delete');
      }
    );
  }

  submitForm() {
    if (this.currentItem._id) {
      switch(this.modalType) {
        case 'grade':
          const grade = this.currentItem;
          this.systemConfigService.editGrade(grade).subscribe(
            (grade) => {
              console.log('Grade updated:', grade);
              this.grades = this.grades.map(g => g._id === grade._id ? grade : g);
            }
          );
          break;
        case 'subject':
          const subject = this.currentItem;
          this.systemConfigService.editSubject(subject).subscribe(
            (subject) => {
              console.log('Subject updated:', subject);
              this.subjects = this.subjects.map(s => s._id === subject._id ? subject : s);
            }
          );
          break;
        case 'form':
          const form = this.currentItem;
          this.systemConfigService.editForm(form).subscribe(
            (form) => {
              console.log('Form updated:', form);
              this.forms = this.forms.map(f => f._id === form._id ? form : f);
            }
          );
          break;
        case 'stream':
          const stream = this.currentItem;
          this.systemConfigService.editStream(stream).subscribe(
            (stream) => {
              console.log('Stream updated:', stream);
              this.streams = this.streams.map(s => s._id === stream._id ? stream : s);
            }
    );
          break;
      }
    } else {
      switch(this.modalType) {
        case 'grade':
          const grade = this.currentItem;
          console.log('Grade:', grade);
          this.systemConfigService.addGrade(grade).subscribe(
            (grade) => {
              console.log('Grade added:', grade);
              this.grades.push(grade);
            },
            (error) => {
              console.error('Error adding grade:', error)
              alert('Grade already exists');
            }
          );
          break;
        case 'subject':
          const subject = this.currentItem;
          this.systemConfigService.addSubject(subject).subscribe(
            (subject) => {
              console.log('Subject added:', subject);
              this.subjects.push(subject);
            },
            (error) => {
              console.error('Error adding subject:', error)
              alert('Subject already exists');
            }
          );
          break;
        case 'form':
          const form = this.currentItem;
          this.systemConfigService.addForm(form).subscribe(
            (form) => {
              console.log('Form added:', form);
              this.forms.push(form);
            },
            (error) => {
              console.error('Error adding form:', error)
              alert('Form already exists');
            }
          );
          break;
        case 'stream':
          const stream = this.currentItem;
          this.systemConfigService.addStream(stream).subscribe(
            (stream) => {
              console.log('Stream added:', stream);
              this.streams.push(stream);
            },
            (error) => {
              console.error('Error adding stream:', error)
              alert('Stream already exists');
            }
          );
          break;
      }
    }

    this.showModal = false;
  }

  closeModal() {
    this.showModal = false;
  }
}