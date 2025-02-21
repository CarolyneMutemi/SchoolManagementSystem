
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeachersService } from '../../../services/admin/teachers.service';
import { Teacher } from '../../../interfaces/teachers';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[] = [];
  filteredTeachers: Teacher[] = [];
  teacherForm!: FormGroup;
  
  // Modal control
  showTeacherModal = false;
  showDeleteModal = false;
  editingTeacher: Teacher | null = null;
  selectedTeacher: Teacher | null = null;

  // Search and filter
  searchQuery = '';
  showFilterDropdown = false;
  subjectFilters: { [key: string]: boolean } = {};

  // Available subjects
  availableSubjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'History',
    'Geography',
    'Computer Science'
  ];

  constructor(
    private teachersService: TeachersService,
    private fb: FormBuilder
  ) {
    this.initializeForm();
    this.initializeSubjectFilters();
  }

  ngOnInit(): void {
    this.loadTeachers();
  }

  private initializeForm(): void {
    this.teacherForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      nationalId: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      subjects: [[], [Validators.required, Validators.minLength(1)]]
    });
  }

  private initializeSubjectFilters(): void {
    this.availableSubjects.forEach(subject => {
      this.subjectFilters[subject] = false;
    });
  }

  loadTeachers(): void {
    // this.teachersService.getTeachers().subscribe(
    //   teachers => {
    //     this.teachers = teachers;
    //     this.applyFilters();
    //   }
    // );
    this.teachers = this.teachersService.getTeachers();
    this.applyFilters();
  }

  // Search and Filter functions
  searchTeachers(): void {
    this.applyFilters();
  }

  toggleFilterDropdown(): void {
    this.showFilterDropdown = !this.showFilterDropdown;
  }

  filterTeachers(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.teachers];

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(teacher => 
        teacher.firstName.toLowerCase().includes(query) ||
        teacher.lastName.toLowerCase().includes(query) ||
        teacher.email.toLowerCase().includes(query) ||
        teacher.subjects.some(subject => 
          subject.toLowerCase().includes(query)
        )
      );
    }

    // Apply subject filters
    const activeSubjectFilters = Object.entries(this.subjectFilters)
      .filter(([_, isSelected]) => isSelected)
      .map(([subject]) => subject);

    if (activeSubjectFilters.length > 0) {
      filtered = filtered.filter(teacher =>
        teacher.subjects.some(subject =>
          activeSubjectFilters.includes(subject)
        )
      );
    }

    this.filteredTeachers = filtered;
  }

  // Modal functions
  openTeacherModal(teacher?: Teacher): void {
    this.editingTeacher = teacher || null;
    if (teacher) {
      this.teacherForm.patchValue(teacher);
    } else {
      this.teacherForm.reset();
      this.teacherForm.patchValue({
        subjects: []
      });
    }
    this.showTeacherModal = true;
  }

  closeTeacherModal(): void {
    this.showTeacherModal = false;
    this.editingTeacher = null;
    this.teacherForm.reset();
  }

  saveTeacher(): void {
    if (this.teacherForm.valid) {
      const teacherData = this.teacherForm.value;
      const teacher = this.editingTeacher
      ? this.teachersService.updateTeacher(this.editingTeacher.nationalId, teacherData)
      : this.teachersService.addTeacher(teacherData);
      this.loadTeachers();
      this.closeTeacherModal();

      //   ? this.teachersService.updateTeacher(this.editingTeacher.id, teacherData)
      //   : this.teachersService.addTeacher(teacherData);

      // operation.subscribe({
      //   next: () => {
      //     this.loadTeachers();
      //     this.closeTeacherModal();
      //   },
      //   error: (error) => {
      //     console.error('Error saving teacher:', error);
      //     // Handle error (show message to user)
      //   }
      // });
    }
  }

  // Action functions
  viewTeacher(teacher: Teacher): void {
    this.selectedTeacher = teacher;
    // Implement view logic (could show a different modal with read-only info)
  }

  editTeacher(teacher: Teacher): void {
    this.openTeacherModal(teacher);
  }

  confirmDelete(teacher: Teacher): void {
    this.selectedTeacher = teacher;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedTeacher = null;
  }

  deleteTeacher(): void {
    if (this.selectedTeacher) {
      this.teachersService.deleteTeacher(this.selectedTeacher.nationalId);
      this.loadTeachers();
      this.closeDeleteModal();
    }
    // if (this.selectedTeacher) {
    //   this.teachersService.deleteTeacher(this.selectedTeacher.id).subscribe({
    //     next: () => {
    //       this.loadTeachers();
    //       this.closeDeleteModal();
    //     },
    //     error: (error) => {
    //       console.error('Error deleting teacher:', error);
    //       // Handle error (show message to user)
    //     }
    //   });
    // }
  }
}