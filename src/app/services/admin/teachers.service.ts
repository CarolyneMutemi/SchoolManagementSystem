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
        subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Geography", "Computer Science"],
        dateJoined: new Date('2022-09-01')
      },
      {
        id: "462805",
        firstName: "Sharon",
        lastName: "Muthoni",
        nationalId: "12345678",
        email: "sharonmuthoni@gmail.com",
        subjects: ["English", "Swahili"],
        dateJoined: new Date('2022-09-01')
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
