// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-streams',
//   templateUrl: './streams.component.html',
//   styleUrls: ['./streams.component.css']
// })
// export class StreamsComponent {

// }


import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface StreamReport {
  stream: string;
  totalStudents: number;
  averageScore: number;
  meanGrade: string;
  subjects: {
    name: string;
    meanScore: number;
    meanGrade: string;
    highestScore: number;
    lowestScore: number;
  }[];
}

// interface StreamsComponent {
//   stream: string;
//   totalStudents: number;
//   averageScore: number;
//   meanGrade: string;
//   subjects: {
//     name: string;
//     meanScore: number;
//     meanGrade: string;
//     highestScore: number;
//     lowestScore: number;
//   }[];
// }

@Component({
  selector: 'app-stream-reports',
  template: `
    <div class="reports-container">
      <div class="header-section">
        <h1 style="color: #9c27b0;">
          <i class="fas fa-users"></i>
          {{ selectedForm }} Stream Reports
        </h1>
        
        <div class="actions">
          <button class="back-btn" (click)="goBack()">
            <i class="fas fa-arrow-left"></i> Back to Reports
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

        <div class="filter-controls">
          <select [(ngModel)]="selectedStream">
            <option value="">All Streams</option>
            <option *ngFor="let stream of streams" [value]="stream">
              {{selectedForm}} {{stream}}
            </option>
          </select>
        </div>
      </div>

      <div class="reports-table">
        <table>
          <thead>
            <tr>
              <th class="sticky-left">Stream</th>
              <th>Total Students</th>
              <th>Average Score</th>
              <th>Mean Grade</th>
              <th *ngFor="let subject of subjects">{{subject}} Mean</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let report of filteredReports">
              <td class="sticky-left">{{selectedForm}} {{report.stream}}</td>
              <td>{{report.totalStudents}}</td>
              <td>{{report.averageScore || '1.1-2'}}</td>
              <td>
                <span [class]="'grade-badge ' + getGradeClass(report.meanGrade)">
                  {{report.meanGrade}}
                </span>
              </td>
              <td *ngFor="let subject of subjects">
                <div class="subject-score">
                  {{getSubjectMean(report, subject) || '1.1-2'}}
                  <span [class]="'grade-badge ' + getGradeClass(getSubjectGrade(report, subject))">
                    {{getSubjectGrade(report, subject)}}
                  </span>
                </div>
              </td>
              <td>
                <button class="view-btn" (click)="viewStreamDetails(report)">
                  <i class="fas fa-chart-line"></i> Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .reports-container {
      padding: 24px;
      max-width: 1400px;
      margin: 0 auto;
      background: #303030;
      color: white;
      min-height: 100vh;
    }

    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .header-section h1 {
      color: white;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .actions {
      display: flex;
      gap: 12px;
    }

    .back-btn {
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

    .back-btn:hover {
      background: #9c27b0;
      color: white;
    }

    .filters-section {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .period-filters {
      display: flex;
      gap: 12px;
    }

    .period-filters select,
    .filter-controls select {
      padding: 10px;
      border: 1px solid #666;
      border-radius: 4px;
      min-width: 120px;
      background: #424242;
      color: white;
    }

    .reports-table {
      overflow-x: auto;
      background: #424242;
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
      border-bottom: 1px solid #666;
    }

    th {
      background: #212121;
      color: white;
      font-weight: 600;
    }

    .sticky-left {
      position: sticky;
      left: 0;
      background: #424242;
      z-index: 2;
      border-right: 2px solid #666;
      outline: 2px solid #666;
    }

    .grade-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: 500;
      margin-left: 8px;
    }

    .grade-a { background: #4CAF50; color: white; }
    .grade-b { background: #8BC34A; color: white; }
    .grade-c { background: #FFC107; color: black; }
    .grade-d { background: #FF9800; color: white; }
    .grade-e { background: #F44336; color: white; }

    .subject-score {
      display: flex;
      align-items: center;
      gap: 8px;
    }

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

    @media (max-width: 768px) {
      .header-section {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }

      .filters-section {
        flex-direction: column;
      }

      .period-filters {
        flex-wrap: wrap;
      }

      .filter-controls select {
        width: 100%;
      }
    }
  `]
})
export class StreamsComponent implements OnInit {
  selectedForm: string = '';
  selectedStream: string = '';
  selectedYear: number;
  selectedTerm: number;
  
  subjects = ['Mathematics', 'English', 'Science', 'History'];
  streams = ['A', 'B', 'C', 'D'];
  years = [2024, 2023, 2022, 2021];
  terms = [
    { value: 1, label: 'Term 1' },
    { value: 2, label: 'Term 2' },
    { value: 3, label: 'Term 3' }
  ];

  // Mock data
  reports: StreamReport[] = [
    {
      stream: 'A',
      totalStudents: 45,
      averageScore: 72.5,
      meanGrade: 'B',
      subjects: [
        { name: 'Mathematics', meanScore: 68.5, meanGrade: 'C', highestScore: 92, lowestScore: 45 },
        { name: 'English', meanScore: 75.2, meanGrade: 'B', highestScore: 88, lowestScore: 52 },
        { name: 'Science', meanScore: 70.8, meanGrade: 'B', highestScore: 90, lowestScore: 48 },
        { name: 'History', meanScore: 75.5, meanGrade: 'B', highestScore: 89, lowestScore: 55 }
      ]
    }
    // Add more mock data as needed
  ];

  constructor(
    private route: ActivatedRoute
  ) {
    this.selectedYear = new Date().getFullYear();
    this.selectedTerm = Math.floor((new Date().getMonth() / 4) + 1);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedForm = params['form'];
    });
  }

  get filteredReports() {
    return this.reports.filter(report => 
      !this.selectedStream || report.stream === this.selectedStream
    );
  }

  getGradeClass(grade: string): string {
    return 'grade-' + grade.toLowerCase();
  }

  getSubjectMean(report: StreamReport, subjectName: string): number {
    return report.subjects.find(s => s.name === subjectName)?.meanScore ?? 0;
  }

  getSubjectGrade(report: StreamReport, subjectName: string): string {
    return report.subjects.find(s => s.name === subjectName)?.meanGrade ?? '';
  }

  viewStreamDetails(report: StreamReport) {
    // Implement stream details view/navigation
  }

  goBack() {
    window.history.back();
  }
}
