import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Teacher } from '../../interfaces/teachers';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  private apiUrl = "http://localhost:8000/teachers";

  constructor(private http: HttpClient) {}

  getTeachers() {
    return this.http.get<Teacher[]>(this.apiUrl);
  }

  addTeacher(teacher: Teacher) {
    return teacher;
  }

  updateTeacher(id: string, teacher: Teacher) {
    return teacher;
  }

  deleteTeacher(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
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
