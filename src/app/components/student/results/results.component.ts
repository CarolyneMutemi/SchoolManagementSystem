// results.component.ts
import { Component, OnInit } from '@angular/core';

interface Subject {
  name: string;
  grade: string;
  marks: number;
  maxMarks: number;
  remarks: string;
}

interface TermResults {
  term: string;
  subjects: Subject[];
  attendance: number;
  rank: number;
  teacherComments: string;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  academicYears: string[] = ['2024-2025', '2023-2024', '2022-2023'];
  selectedYear: string = '2024-2025';
  terms: string[] = ['Term 1', 'Term 2', 'Term 3'];
  selectedTermIndex: number = 0;
  
  studentInfo = {
    name: 'John Doe',
    class: 'X-B',
    rollNo: '1023',
    admissionNo: 'ADM20210023'
  };
  
  results: TermResults[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadResults();
  }

  loadResults(): void {
    // In a real app, this would be an API call
    // Mock data for demonstration
    if (this.selectedYear === '2024-2025') {
      this.results = [
        {
          term: 'Term 1',
          subjects: [
            { name: 'Mathematics', grade: 'A', marks: 92, maxMarks: 100, remarks: 'Excellent performance' },
            { name: 'Science', grade: 'A', marks: 90, maxMarks: 100, remarks: 'Very good understanding' },
            { name: 'English', grade: 'B', marks: 82, maxMarks: 100, remarks: 'Good writing skills' },
            { name: 'Social Studies', grade: 'B', marks: 78, maxMarks: 100, remarks: 'Need to improve critical analysis' },
            { name: 'Computer Science', grade: 'A', marks: 95, maxMarks: 100, remarks: 'Outstanding programming skills' }
          ],
          attendance: 96,
          rank: 3,
          teacherComments: 'John shows excellent potential in academic subjects, especially in STEM fields. He should work on improving his critical analysis skills in Social Studies.'
        },
        {
          term: 'Term 2',
          subjects: [
            { name: 'Mathematics', grade: 'A', marks: 95, maxMarks: 100, remarks: 'Outstanding performance' },
            { name: 'Science', grade: 'A', marks: 88, maxMarks: 100, remarks: 'Consistent performance' },
            { name: 'English', grade: 'B', marks: 85, maxMarks: 100, remarks: 'Improved writing skills' },
            { name: 'Social Studies', grade: 'B', marks: 80, maxMarks: 100, remarks: 'Showing improvement' },
            { name: 'Computer Science', grade: 'A', marks: 97, maxMarks: 100, remarks: 'Exceptional coding abilities' }
          ],
          attendance: 94,
          rank: 2,
          teacherComments: 'John continues to excel in his studies. His improvement in Social Studies is commendable. He should maintain this progress in the final term.'
        },
        {
          term: 'Term 3',
          subjects: [
            { name: 'Mathematics', grade: 'A', marks: 96, maxMarks: 100, remarks: 'Outstanding problem-solving skills' },
            { name: 'Science', grade: 'A', marks: 92, maxMarks: 100, remarks: 'Excellent practical knowledge' },
            { name: 'English', grade: 'A', marks: 88, maxMarks: 100, remarks: 'Great improvement in writing' },
            { name: 'Social Studies', grade: 'B', marks: 84, maxMarks: 100, remarks: 'Consistent progress' },
            { name: 'Computer Science', grade: 'A', marks: 98, maxMarks: 100, remarks: 'Top performer' }
          ],
          attendance: 98,
          rank: 1,
          teacherComments: 'John has shown remarkable improvement throughout the year. His dedication and hard work have paid off, especially in English and Social Studies where he has improved significantly.'
        }
      ];
    } else if (this.selectedYear === '2023-2024') {
      this.results = [
        {
          term: 'Term 1',
          subjects: [
            { name: 'Mathematics', grade: 'B', marks: 85, maxMarks: 100, remarks: 'Good performance' },
            { name: 'Science', grade: 'B', marks: 82, maxMarks: 100, remarks: 'Needs to focus more on theory' },
            { name: 'English', grade: 'C', marks: 75, maxMarks: 100, remarks: 'Work on grammar' },
            { name: 'Social Studies', grade: 'C', marks: 72, maxMarks: 100, remarks: 'Improve factual knowledge' },
            { name: 'Computer Science', grade: 'A', marks: 90, maxMarks: 100, remarks: 'Natural aptitude' }
          ],
          attendance: 92,
          rank: 5,
          teacherComments: 'John needs to focus more on his studies, especially English and Social Studies. His performance in Computer Science is commendable.'
        },
        {
          term: 'Term 2',
          subjects: [
            { name: 'Mathematics', grade: 'B', marks: 88, maxMarks: 100, remarks: 'Showing improvement' },
            { name: 'Science', grade: 'B', marks: 85, maxMarks: 100, remarks: 'Better understanding of concepts' },
            { name: 'English', grade: 'C', marks: 78, maxMarks: 100, remarks: 'Slight improvement in writing' },
            { name: 'Social Studies', grade: 'C', marks: 75, maxMarks: 100, remarks: 'Need to work harder' },
            { name: 'Computer Science', grade: 'A', marks: 92, maxMarks: 100, remarks: 'Excellent programming skills' }
          ],
          attendance: 94,
          rank: 4,
          teacherComments: 'John is showing gradual improvement. He needs to continue working on his English and Social Studies.'
        },
        {
          term: 'Term 3',
          subjects: [
            { name: 'Mathematics', grade: 'A', marks: 90, maxMarks: 100, remarks: 'Very good performance' },
            { name: 'Science', grade: 'B', marks: 87, maxMarks: 100, remarks: 'Good practical knowledge' },
            { name: 'English', grade: 'B', marks: 80, maxMarks: 100, remarks: 'Improved significantly' },
            { name: 'Social Studies', grade: 'B', marks: 78, maxMarks: 100, remarks: 'Better understanding of concepts' },
            { name: 'Computer Science', grade: 'A', marks: 94, maxMarks: 100, remarks: 'Outstanding performance' }
          ],
          attendance: 95,
          rank: 3,
          teacherComments: 'John has made significant progress this year. His improvement in English and Social Studies is noteworthy. He should continue with the same dedication next year.'
        }
      ];
    } else {
      this.results = [
        {
          term: 'Term 1',
          subjects: [
            { name: 'Mathematics', grade: 'C', marks: 75, maxMarks: 100, remarks: 'Needs improvement' },
            { name: 'Science', grade: 'C', marks: 72, maxMarks: 100, remarks: 'Work harder on concepts' },
            { name: 'English', grade: 'D', marks: 68, maxMarks: 100, remarks: 'Poor grammar and vocabulary' },
            { name: 'Social Studies', grade: 'D', marks: 65, maxMarks: 100, remarks: 'Lacks basic understanding' },
            { name: 'Computer Science', grade: 'B', marks: 82, maxMarks: 100, remarks: 'Shows interest' }
          ],
          attendance: 85,
          rank: 10,
          teacherComments: 'John needs to significantly improve his study habits. His attendance is also a concern. Special attention is required in English and Social Studies.'
        },
        {
          term: 'Term 2',
          subjects: [
            { name: 'Mathematics', grade: 'C', marks: 78, maxMarks: 100, remarks: 'Slight improvement' },
            { name: 'Science', grade: 'C', marks: 75, maxMarks: 100, remarks: 'Better than last term' },
            { name: 'English', grade: 'C', marks: 70, maxMarks: 100, remarks: 'Working on weaknesses' },
            { name: 'Social Studies', grade: 'C', marks: 68, maxMarks: 100, remarks: 'Showing some interest' },
            { name: 'Computer Science', grade: 'B', marks: 85, maxMarks: 100, remarks: 'Good programming logic' }
          ],
          attendance: 88,
          rank: 8,
          teacherComments: 'John is showing signs of improvement. His attendance has also improved. He needs to maintain this trajectory and work harder in all subjects.'
        },
        {
          term: 'Term 3',
          subjects: [
            { name: 'Mathematics', grade: 'B', marks: 82, maxMarks: 100, remarks: 'Good improvement' },
            { name: 'Science', grade: 'B', marks: 80, maxMarks: 100, remarks: 'Better understanding' },
            { name: 'English', grade: 'C', marks: 75, maxMarks: 100, remarks: 'Gradual improvement' },
            { name: 'Social Studies', grade: 'C', marks: 70, maxMarks: 100, remarks: 'More effort needed' },
            { name: 'Computer Science', grade: 'A', marks: 88, maxMarks: 100, remarks: 'Excellent progress' }
          ],
          attendance: 90,
          rank: 6,
          teacherComments: 'John has shown good improvement this year, especially in the final term. He should continue to focus on his studies and improve his attendance further next year.'
        }
      ];
    }
  }

  getGradeClass(grade: string): string {
    switch(grade) {
      case 'A': return 'grade-A';
      case 'B': return 'grade-B';
      case 'C': return 'grade-C';
      case 'D': return 'grade-D';
      case 'F': return 'grade-F';
      default: return '';
    }
  }

  calculateTotal(property: 'marks' | 'maxMarks'): number {
    if (!this.results || this.results.length === 0) {
      return 0;
    }
    
    return this.results[this.selectedTermIndex]?.subjects.reduce((total, subject) => {
      return total + subject[property];
    }, 0) || 0;
  }

  calculatePercentage(): string {
    if (!this.results || this.results.length === 0) {
      return '0';
    }
    
    const totalMarks = this.calculateTotal('marks');
    const totalMaxMarks = this.calculateTotal('maxMarks');
    
    if (totalMaxMarks === 0) {
      return '0';
    }
    
    return ((totalMarks / totalMaxMarks) * 100).toFixed(2);
  }

  getOverallRemarks(): string {
    if (!this.results || this.results.length === 0) {
      return '';
    }
    
    const percentage = parseFloat(this.calculatePercentage());
    
    if (percentage >= 90) {
      return 'Outstanding';
    } else if (percentage >= 80) {
      return 'Excellent';
    } else if (percentage >= 70) {
      return 'Very Good';
    } else if (percentage >= 60) {
      return 'Good';
    } else if (percentage >= 50) {
      return 'Average';
    } else {
      return 'Needs Improvement';
    }
  }

  downloadResults(): void {
    alert('Download functionality would be implemented here');
    // In a real app, this would generate a PDF or other report format
  }

  printResults(): void {
    window.print();
  }

  compareResults(): void {
    alert('Compare functionality would be implemented here');
    // In a real app, this would show a comparison view of all terms
  }
}