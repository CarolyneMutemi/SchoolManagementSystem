import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface StudentReport {
  id: string;
  name: string;
  form: string;
  stream: string;
  overallGrade: string;
  subjects: {
    name: string;
    grade: string;
    score: number;
  }[];
}

interface AggregateReport {
  formOrStream: string;
  overallMean: number;
  subjectMeans: {
    subject: string;
    mean: number;
  }[];
}

interface SortConfig {
  column: string;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-academic-reports',
  template: `
    <div class="reports-container">
      <div class="header-section">
        <h1 style="color: #9c27b0;">
          <i class="fas fa-chart-line"></i>
          {{ viewMode === 'student' ? 'Academic Reports' : 
            (selectedForm ? 'Academic Report ' + selectedForm : 'Academic Reports') }}
        </h1>
        
        <div class="view-toggle">
          <button 
            [class.active]="viewMode === 'student'"
            (click)="viewMode = 'student'">
            <i class="fas fa-user-graduate"></i> Student Reports
          </button>
          <button 
            [class.active]="viewMode === 'aggregate'"
            (click)="viewMode = 'aggregate'">
            <i class="fas fa-chart-bar"></i> Mean Scores
          </button>
        </div>
      </div>

      <div class="filters-section">
        <div class="period-filters">
          <select [(ngModel)]="selectedYear">
            <option *ngFor="let year of years" [value]="year">
              {{year}}
            </option>
          </select>

          <select [(ngModel)]="selectedTerm">
            <option *ngFor="let term of terms" [value]="term.value">
              {{term.label}}
            </option>
          </select>
        </div>

        <div class="search-box">
          <i class="fas fa-search"></i>
          <input 
            type="text" 
            [placeholder]="getSearchPlaceholder()"
            [(ngModel)]="searchTerm"
          >
        </div>

        <div class="filter-controls">
          <select *ngIf="viewMode === 'student'" [(ngModel)]="selectedForm">
            <option value="">All Forms</option>
            <option *ngFor="let form of forms" [value]="form">
              {{form}}
            </option>
          </select>

          <select *ngIf="viewMode === 'student'" [(ngModel)]="selectedStream">
            <option value="">All Streams</option>
            <option *ngFor="let stream of streams" [value]="stream">
              {{stream}}
            </option>
          </select>

          <select *ngIf="viewMode === 'aggregate' && !selectedForm" [(ngModel)]="selectedForm">
            <option value="">All Forms</option>
            <option *ngFor="let form of forms" [value]="form">
              {{form}}
            </option>
          </select>

          <select *ngIf="viewMode === 'aggregate' && selectedForm" [(ngModel)]="selectedStream">
            <option value="">All Streams</option>
            <option *ngFor="let stream of getFormStreams(selectedForm)" [value]="stream">
              {{stream}}
            </option>
          </select>
        </div>
      </div>

      <!-- Student Reports View -->
      <div class="reports-table" *ngIf="viewMode === 'student'">
        <table>
          <thead>
            <tr>
              <th class="sticky-left">
                <div class="sort-header" (click)="sort('name')">
                  Student Name
                  <i class="fas" [class.fa-sort-up]="sortConfig.column === 'name' && sortConfig.direction === 'asc'"
                     [class.fa-sort-down]="sortConfig.column === 'name' && sortConfig.direction === 'desc'"
                     [class.fa-sort]="sortConfig.column !== 'name'"></i>
                </div>
              </th>
              <th>
                <div class="sort-header" (click)="sort('id')">
                  Student ID
                  <i class="fas" [ngClass]="getSortIcon('id')"></i>
                </div>
              </th>
              <th>Form</th>
              <th>Stream</th>
              <th>
                <div class="sort-header" (click)="sort('overallGrade')">
                  Overall Grade
                  <i class="fas" [ngClass]="getSortIcon('overallGrade')"></i>
                </div>
              </th>
              <th *ngFor="let subject of subjects">
                <div class="sort-header" (click)="sort(subject)">
                  {{subject}}
                  <i class="fas" [ngClass]="getSortIcon(subject)"></i>
                </div>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let report of sortedReports">
              <td class="sticky-left">{{report.name}}</td>
              <td>{{report.id}}</td>
              <td>{{report.form}}</td>
              <td>{{report.stream}}</td>
              <td>
                <span [class]="'grade-badge ' + getGradeClass(report.overallGrade)">
                  {{report.overallGrade}}
                </span>
              </td>
              <td *ngFor="let subject of subjects">
                <span [class]="'grade-badge ' + getGradeClass(getSubjectGrade(report, subject))">
                  {{getSubjectGrade(report, subject)}}
                </span>
              </td>
              <td>
                <button class="view-btn" (click)="openReportDetails(report)">
                  <i class="fas fa-eye"></i> View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Aggregate Reports View -->
      <div class="reports-table" *ngIf="viewMode === 'aggregate'">
        <table>
          <thead>
            <tr>
              <th class="sticky-left">
                <div class="sort-header" (click)="sort('formOrStream')">
                  Form/Stream
                  <i class="fas" [ngClass]="getSortIcon('formOrStream')"></i>
                </div>
              </th>
              <th>
                <div class="sort-header" (click)="sort('overallMean')">
                  Overall Mean
                  <i class="fas" [ngClass]="getSortIcon('overallMean')"></i>
                </div>
              </th>
              <th *ngFor="let subject of subjects">
                <div class="sort-header" (click)="sort(subject)">
                  {{subject}}
                  <i class="fas" [ngClass]="getSortIcon(subject)"></i>
                </div>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let report of sortedAggregateReports">
              <td class="sticky-left">{{report.formOrStream}}</td>
              <td>{{report.overallMean | number:'1.1-2'}}</td>
              <td *ngFor="let subject of subjects">
                {{getSubjectMean(report, subject) | number:'1.1-2'}}
              </td>
              <td>
                <button class="view-btn" (click)="viewStreams(report)">
                  <i class="fas fa-chart-pie"></i> View Streams
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Report Details Modal -->
    <div class="modal" *ngIf="selectedReport" (click)="closeModal($event)">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Student Report Details</h2>
          <button class="close-btn" (click)="selectedReport = null">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="student-info">
            <p><strong>Student ID:</strong> {{selectedReport.id}}</p>
            <p><strong>Name:</strong> {{selectedReport.name}}</p>
            <p><strong>Form:</strong> {{selectedReport.form}}</p>
            <p><strong>Stream:</strong> {{selectedReport.stream}}</p>
            <p><strong>Overall Grade:</strong> 
              <span [class]="'grade-badge ' + getGradeClass(selectedReport.overallGrade)">
                {{selectedReport.overallGrade}}
              </span>
            </p>
          </div>
          <div class="subjects-table">
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let subject of selectedReport.subjects">
                  <td>{{subject.name}}</td>
                  <td>{{subject.score}}</td>
                  <td>
                    <span [class]="'grade-badge ' + getGradeClass(subject.grade)">
                      {{subject.grade}}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
  .reports-container {
      padding: 24px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .header-section h1 {
      color: #333;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .view-toggle {
      display: flex;
      gap: 12px;
    }

    .view-toggle button {
      padding: 8px 16px;
      border: 1px solid #9c27b0;
      background: transparent;
      color: #9c27b0;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
    }

    .view-toggle button.active {
      background: #9c27b0;
      color: white;
    }

    .filters-section {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .search-box {
      flex: 1;
      min-width: 250px;
      position: relative;
    }

    .search-box i {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
    }

    .search-box input {
      width: 90%;
      padding: 10px 12px 10px 36px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }

    .filter-controls {
      display: flex;
      gap: 12px;
    }

    .filter-controls select {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      min-width: 150px;
    }

    .reports-table {
      overflow-x: auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    th {
      background: #f5f5f5;
      font-weight: 600;
    }

    .grade-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: 500;
    }

    .grade-a { background: #4CAF50; color: white; }
    .grade-b { background: #8BC34A; color: white; }
    .grade-c { background: #FFC107; color: black; }
    .grade-d { background: #FF9800; color: white; }
    .grade-e { background: #F44336; color: white; }

    .view-btn {
      padding: 6px 12px;
      background: #9c27b0;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      border-radius: 8px;
      width: 90%;
      max-width: 800px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-header {
      padding: 16px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: #666;
    }

    .modal-body {
      padding: 16px;
    }

    .student-info {
      margin-bottom: 24px;
    }

    .student-info p {
      margin: 8px 0;
    }

    @media (max-width: 768px) {
      .header-section {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }

      .filters-section {
        flex-direction: column;
      }

      .filter-controls {
        flex-wrap: wrap;
      }

      .modal-content {
        width: 95%;
        margin: 16px;
      }
    }
    /* Previous styles remain the same */

    .period-filters {
      display: flex;
      gap: 12px;
    }

    .period-filters select {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      min-width: 120px;
      background: #424242;
      color: white;
      border-color: #666;
    }

    .sticky-left {
      position: sticky;
      left: 0;
      background: #424242;
      z-index: 2;
      border-right: 2px solid #666;
      outline: 2px solid #666;
    }

    .sort-header {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      user-select: none;
    }

    .sort-header:hover {
      color: #9c27b0;
    }

    .sort-header i {
      opacity: 0.5;
    }

    .sort-header:hover i {
      opacity: 1;
    }

    /* Dark theme enhancements */
    .reports-container {
      background: #303030;
      color: white;
    }

    .reports-table {
      background: #424242;
    }

    table th {
      background: #212121;
      color: white;
    }

    table td {
      border-color: #666;
    }

    .search-box input,
    .filter-controls select {
      background: #424242;
      color: white;
      border-color: #666;
    }

    .search-box input::placeholder {
      color: #aaa;
    }

    .modal-content {
      background: #424242;
      color: white;
    }

    .modal-header {
      border-color: #666;
    }

    @media (max-width: 768px) {
      .period-filters {
        flex-direction: row;
        flex-wrap: wrap;
      }

      .filter-controls select {
        flex: 1;
        min-width: 150px;
      }
    }
  `]
})
export class AcademicReportsComponent implements OnInit {
  viewMode: 'student' | 'aggregate' = 'student';
  searchTerm = '';
  selectedForm = '';
  selectedStream = '';
  selectedReport: StudentReport | null = null;
  selectedYear: number;
  selectedTerm: number;
  sortConfig: SortConfig = { column: '', direction: 'asc' };
  
  // Mock data
  subjects = ['Mathematics', 'English', 'Science', 'History'];
  forms = ['Form 1', 'Form 2', 'Form 3', 'Form 4'];
  streams = ['A', 'B', 'C', 'D'];
  years = [2024, 2023, 2022, 2021];
  terms = [
    { value: 1, label: 'Term 1' },
    { value: 2, label: 'Term 2' },
    { value: 3, label: 'Term 3' }
  ];

  constructor(private router: Router) {
    this.selectedYear = new Date().getFullYear();
    this.selectedTerm = Math.floor((new Date().getMonth() / 4) + 1);
  }

    filterType = 'form';
    selectedFilter = '';
    
    // Mock data - replace with actual data from your service\
    filterOptions = ['Form 1', 'Form 2', 'Form 3', 'Form 4', '1A', '1B', '2A', '2B'];
  
    reports: StudentReport[] = [
      {
        id: 'STD001',
        name: 'John Doe',
        form: 'Form 1',
        stream: '1A',
        overallGrade: 'A',
        subjects: [
          { name: 'Mathematics', grade: 'A', score: 85 },
          { name: 'English', grade: 'B', score: 75 },
          { name: 'Science', grade: 'A', score: 88 },
          { name: 'History', grade: 'B', score: 78 }
        ]
      }
      // Add more mock data as needed
    ];
  
    aggregateReports: AggregateReport[] = [
      {
        formOrStream: 'Form 1',
        overallMean: 76.5,
        subjectMeans: [
          { subject: 'Mathematics', mean: 72.5 },
          { subject: 'English', mean: 78.3 },
          { subject: 'Science', mean: 75.8 },
          { subject: 'History', mean: 79.4 }
        ]
      }
      // Add more mock data as needed
    ];
  
    get filteredReports() {
      return this.reports.filter(report => {
        const matchesSearch = 
          report.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          report.id.toLowerCase().includes(this.searchTerm.toLowerCase());
        
        const matchesFilter = !this.selectedFilter ||
          (this.filterType === 'form' && report.form === this.selectedFilter) ||
          (this.filterType === 'stream' && report.stream === this.selectedFilter);
  
        return matchesSearch && matchesFilter;
      });
    }
  
    get filteredAggregateReports() {
      return this.aggregateReports.filter(report => {
        const matchesSearch = !this.searchTerm || 
          report.subjectMeans.some(s => 
            s.subject.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
        
        const matchesFilter = !this.selectedFilter ||
          report.formOrStream === this.selectedFilter;
  
        return matchesSearch && matchesFilter;
      });
    }
  
    getGradeClass(grade: string): string {
      return 'grade-' + grade.toLowerCase();
    }
  
    getSubjectMean(report: AggregateReport, subject: string): number {
      return report.subjectMeans.find(s => s.subject === subject)?.mean ?? 0;
    }

    getSubjectGrade(report: StudentReport, subject: string): string {
      const subjectReport = report.subjects.find(s => s.name === subject);
      return subjectReport ? subjectReport.grade : '';
    }
  
    openReportDetails(report: StudentReport) {
      this.selectedReport = report;
    }
  
    openAggregateDetails(report: AggregateReport) {
      // Implement aggregate details view
    }
  
    closeModal(event: MouseEvent) {
      if ((event.target as HTMLElement).classList.contains('modal')) {
        this.selectedReport = null;
      }
    }
  
    ngOnInit() {
      // Initialize with data from your service
    }

  // ... (previous methods remain)

  sort(column: string) {
    if (this.sortConfig.column === column) {
      this.sortConfig.direction = this.sortConfig.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortConfig = { column, direction: 'asc' };
    }
  }

  getSortIcon(column: string): string {
    if (this.sortConfig.column !== column) return 'fa-sort';
    return this.sortConfig.direction === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  }

  get sortedReports() {
    return [...this.filteredReports].sort((a, b) => {
      const modifier = this.sortConfig.direction === 'asc' ? 1 : -1;
      const aValue = this.getValueForSort(a, this.sortConfig.column);
      const bValue = this.getValueForSort(b, this.sortConfig.column);
      return aValue > bValue ? modifier : -modifier;
    });
  }

  get sortedAggregateReports() {
    return [...this.filteredAggregateReports].sort((a, b) => {
      const modifier = this.sortConfig.direction === 'asc' ? 1 : -1;
      const aValue = this.getValueForSort(a, this.sortConfig.column);
      const bValue = this.getValueForSort(b, this.sortConfig.column);
      return aValue > bValue ? modifier : -modifier;
    });
  }

  getValueForSort(item: any, column: string): any {
    if (column === 'overallGrade') return item[column];
    if (this.subjects.includes(column)) {
      const subject = item.subjects?.find((s: any) => s.name === column);
      return subject ? subject.score : 0;
    }
    return item[column];
  }

  getSearchPlaceholder(): string {
    if (this.viewMode === 'student') return 'Search by Student Name/ID';
    return this.selectedForm ? 'Search by Stream' : 'Search by Form';
  }

  getFormStreams(form: string): string[] {
    // In a real
    return this.streams;
  }

  viewStreams(report: AggregateReport) {
    // this.router.navigate(['/streams', report.formOrStream]);
    this.router.navigate(['/reports/streams', "form_1"]);
  }

  // ... (previous methods remain)
}
