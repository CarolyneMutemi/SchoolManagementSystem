// teachers.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { TeachersService } from 'src/app/services/admin/teachers.service';
import { SystemConfigService } from 'src/app/services/admin/system-config.service';
import { Subject, Stream, Grade, Form } from 'src/app/interfaces/system-config';
import { Teacher } from 'src/app/interfaces/teachers';



// interface Teacher {
//   _id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   _id: string;
//   phoneNumber: string;
//   teacherId: string;  // Added teacher ID
//   qualified_subjects: string[];  // Renamed for clarity
//   classes_taught: TeachingAssignment[];  // Added teaching assignments
//   isClassTeacher: boolean;
//   classes_in_charge?: Class[];
// }



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

  // For multiselect component
  qualifiedSubjectSearch = '';
  showQualifiedDropdown = false;

  // Subject search for teaching assignments
  subjectSearches: string[] = [];
  showSubjectDropdowns: boolean[] = [];

  // subjects = ['Mathematics', 'English', 'Science', 'History', 'Geography'];
  // classes = ['Form 1', 'Form 2', 'Form 3', 'Form 4'];
  // streams = ['A', 'B', 'C', 'D'];

  subject_objects: Subject[] = [];
  subjects: string[] = []
  classes: Number[] = [];
  streams: string[] = [];

  constructor(private fb: FormBuilder, private teachersService: TeachersService, private systemConfigService: SystemConfigService) {
    this.teacherForm = this.createTeacherForm();
  }

  ngOnInit() {
    this.loadTeachers();

    this.systemConfigService.getSubjects().subscribe((subjects: Subject[]) => {
      this.subjects = subjects.map(subject => subject.code);
      this.subject_objects = subjects
    });

    this.systemConfigService.getForms().subscribe((forms: Form[]) => {
      this.classes = forms.map(form => form.level);
    });

    this.systemConfigService.getStreams().subscribe((streams: Stream[]) => {
      this.streams = streams.map(stream => stream.name);
    });

    // Close dropdown when clicking outside.
    document.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.custom-multiselect')) {
        this.showQualifiedDropdown = false;
        this.showSubjectDropdowns = this.showSubjectDropdowns.map(() => false);
      }
    });
  }


  createTeacherForm(): FormGroup {
    return this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      national_id: ['', Validators.required],
      phone_number: ['', Validators.required],
      enrollment_date: ['', Validators.required],
      qualified_subjects: [[]],
      classes_taught: this.fb.array([]),
      is_class_teacher: [false],
      classes_in_charge: this.fb.array([])
    });
  }

  get classes_taught() {
    return this.teacherForm.get('classes_taught') as FormArray;
  }

  get classes_in_charge() {
    return this.teacherForm.get('classes_in_charge') as FormArray;
  }

  // Custom multi-select methods
  filteredQualifiedSubjects() {
    const currentlySelected = this.teacherForm!.get('qualified_subjects')!.value || [];
    return this.subjects.filter(subject => 
      !currentlySelected.includes(subject) && 
      subject.toLowerCase().includes(this.qualifiedSubjectSearch.toLowerCase())
    );
  }

  addQualifiedSubject(subject: string) {
    const currentSubjects = [...this.teacherForm!.get('qualified_subjects')!.value || []];
    if (!currentSubjects.includes(subject)) {
      currentSubjects.push(subject);
      this.teacherForm!.get('qualified_subjects')!.setValue(currentSubjects);
      this.qualifiedSubjectSearch = '';
      this.showQualifiedDropdown = false;
    }
  }

  removeQualifiedSubject(subject: string) {
    const currentSubjects = [...this.teacherForm!.get('qualified_subjects')!.value || []];
    const index = currentSubjects.indexOf(subject);
    if (index !== -1) {
      currentSubjects.splice(index, 1);
      this.teacherForm!.get('qualified_subjects')!.setValue(currentSubjects);
    }
  }

  addTeachingAssignment() {
    const assignmentForm = this.fb.group({
      form: ['', Validators.required],
      stream: ['', Validators.required],
      subjects: ['', Validators.required]
    });

    this.classes_taught.push(assignmentForm);
    this.subjectSearches.push('');
    this.showSubjectDropdowns.push(false);
  }

  removeTeachingAssignment(index: number) {
    this.classes_taught.removeAt(index);
    this.subjectSearches.splice(index, 1);
    this.showSubjectDropdowns.splice(index, 1);
  }

  addClassTeacherOf() {
    const classTeacher = this.fb.group({
      form: ['', Validators.required],
      stream: ['', Validators.required]
    });

    this.classes_in_charge.push(classTeacher);
  }

  removeClassTeacherOf(index: number) {
    this.classes_in_charge.removeAt(index);
  }

  // Methods for assignment subjects
  filteredAssignmentSubjects(index: number): string[] {
    const search = this.subjectSearches[index].toLowerCase();
    const currentSubjects = this.classes_taught.at(index).get('subjects')?.value || [];
    
    return this.subjects.filter(subject => 
      subject.toLowerCase().includes(search) && 
      !currentSubjects.includes(subject)
    );
  }
  
  addAssignmentSubject(index: number, subject: string): void {
    const assignment = this.classes_taught.at(index);
    const currentSubjects = [...assignment.get('subjects')?.value];
    
    if (!currentSubjects.includes(subject)) {
      assignment.patchValue({
        subjects: [...currentSubjects, subject]
      });
    }
    
    this.subjectSearches[index] = '';
  }
  
  removeAssignmentSubject(index: number, subject: string): void {
    const assignment = this.classes_taught.at(index);
    const currentSubjects = assignment.get('subjects')?.value;
    
    assignment.patchValue({
      subjects: currentSubjects.filter((s: string) => s !== subject)
    });
  }

  openModal(teacher?: Teacher) {
    this.editingTeacher = teacher || null;
    if (teacher) {
      // Clear existing assignments
      while (this.classes_taught.length) {
        this.classes_taught.removeAt(0);
      }
      
      // Add each teaching assignment
      console.log("Teacher assignments: ", teacher.classes_taught);
      teacher.classes_taught.forEach(assignment => {
        console.log("Assignment: ", assignment);
        this.classes_taught.push(this.fb.group({
          form: [assignment.form],
          stream: [assignment.stream],
          subjects: [assignment.subjects]
        }));
      });

      this.teacherForm.patchValue(teacher);
    } else {
      this.teacherForm.reset();
      this.classes_taught.clear();
      this.addTeachingAssignment(); // Add one empty assignment by default
      this.markFormGroupTouched(this.teacherForm);
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingTeacher = null;
    this.teacherForm.reset();
    this.classes_taught.clear();
  }

  saveTeacher() {
    if (this.teacherForm.valid) {
      const teacherData = this.teacherForm.value;
      const { is_class_teacher, ...teacher} = teacherData;
      if (this.editingTeacher) {
        console.log("Edited teacher data: ", teacher);
        const {_id, ...teacherObject} = teacher;
        this.teachersService.updateTeacher(this.editingTeacher._id, teacherObject).subscribe({
          next: (updatedTeacher: Teacher) => {
            const index = this.teachers.findIndex(t => t._id === updatedTeacher._id);
            this.teachers[index] = updatedTeacher;
          },
          error: (error) => {
            console.error('Error updating teacher: ', error);
            alert('Error updating teacher. Please try again.');
          }
        });
      } else {
        console.log("Teacher data: ", teacher);
        // this.teachers.push({...teacher });
        this.teachersService.addTeacher(teacher).subscribe({
          next: (teacher: Teacher) => {
            this.teachers.push(teacher);
          },
          error: (error) => {
            console.error('Error adding teacher: ', error);
            alert('Error adding teacher. Please try again.');
          }
        });
      }
      this.closeModal();
    }
    else {
      this.markFormGroupTouched(this.teacherForm);
    }
  }

  deleteTeacher(id: string) {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.teachersService.deleteTeacher(id).subscribe(() => {
      this.teachers = this.teachers.filter(t => t._id !== id);
    });
    }
  }

  get filteredTeachers() {
    return this.teachers.filter(teacher => {
      const nameMatch = (teacher.first_name + ' ' + teacher.last_name)
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      
      const subjectMatch = !this.selectedSubjectFilter || 
        teacher.qualified_subjects.includes(this.selectedSubjectFilter);

      return nameMatch && subjectMatch;
    });
  }

  private loadTeachers() {
    this.teachersService.getTeachers().subscribe((teachers: Teacher[]) => {
      console.log("Teachers: ", teachers);
      this.teachers = teachers;
    });
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        for (let i = 0; i < control.length; i++) {
          if (control.at(i) instanceof FormGroup) {
            this.markFormGroupTouched(control.at(i) as FormGroup);
          }
        }
      }
    });
  }
}