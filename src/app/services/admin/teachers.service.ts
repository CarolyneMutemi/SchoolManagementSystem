// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class TeachersService {

//   constructor() { }
// }


// teachers.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Teacher } from '../../interfaces/teachers';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  private apiUrl = 'your-api-endpoint/teachers'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getTeachers() {
    const teachers = [
      {
        id: "462804",
        firstName: "Monicah",
        lastName: "Mutemi",
        nationalId: "12345678",
        email: "monicahmutemi@gmail.com",
        phoneNumber: "0712345678",
        subjects: [{ name: "Mathematics", code: "MAT" }, { name: "Physics", code: "PHY" }],
        dateJoined: new Date('2022-09-01'),
        assignedClasses: [
          {
            class: "Form 1",
            stream: "A",
            subject: "Mathematics"
          },
          {
            class: "Form 2",
            stream: "B",
            subject: "Physics"
          }
        ],
        classTeacherOf: {
          class: "Form 1",
          stream: "A"
        }
      },
      {
        id: "462805",
        firstName: "Sharon",
        lastName: "Muthoni",
        nationalId: "12345678",
        email: "sharonmuthoni@gmail.com",
        phoneNumber: "0712345678",
        subjects: [{ name: "English", code: "ENG" }, { name: "Swahili", code: "SWA" }],
        dateJoined: new Date('2022-09-01'),
        assignedClasses: [
          {
            class: "Form 1",
            stream: "B",
            subject: "English"
          },
          {
            class: "Form 2",
            stream: "C",
            subject: "Swahili"
          }
        ],
        classTeacherOf: {
          class: "Form 1",
          stream: "B"
        }
      }
    ]
    return teachers;
  }

  addTeacher(teacher: Teacher) {
    return teacher;
  }

  updateTeacher(id: string, teacher: Teacher) {
    return teacher;
  }

  deleteTeacher(id: string) {
    return;
  }

  // getTeachers(): Observable<Teacher[]> {
  //   return this.http.get<Teacher[]>(this.apiUrl);
  // }

  // addTeacher(teacher: Teacher): Observable<Teacher> {
  //   return this.http.post<Teacher>(this.apiUrl, teacher);
  // }

  // updateTeacher(id: string, teacher: Teacher): Observable<Teacher> {
  //   return this.http.put<Teacher>(`${this.apiUrl}/${id}`, teacher);
  // }

  // deleteTeacher(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
}
