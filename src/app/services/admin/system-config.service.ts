import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

import { Grade, Subject, Form, Stream } from 'src/app/interfaces/system-config';

@Injectable({
  providedIn: 'root'
})
export class SystemConfigService {
  apiURL = 'http://localhost:8000/config';
  grades: BehaviorSubject<Grade[]> = new BehaviorSubject<Grade[]>([]);
  subjects: BehaviorSubject<Subject[]> = new BehaviorSubject<Subject[]>([]);
  forms: BehaviorSubject<Form[]> = new BehaviorSubject<Form[]>([]);
  streams: BehaviorSubject<Stream[]> = new BehaviorSubject<Stream[]>([]);

  constructor(private httpClient: HttpClient) { }

  fetchGrades(): void {
    this.httpClient.get<Grade[]>(`${this.apiURL}/grades`).pipe(
      // Update the grades BehaviorSubject
      tap((grades: Grade[]) => this.grades.next(grades))
    ).subscribe();
  }

  getGrades(): Observable<Grade[]> {
    if (this.grades.value.length === 0) {
      this.fetchGrades();
      return this.grades.asObservable();
    }
    return this.grades.asObservable();
  }

  fetchSubjects(): void {
    this.httpClient.get<Subject[]>(`${this.apiURL}/subjects`).pipe(
      // Update the subjects BehaviorSubject
      tap((subjects: Subject[]) => this.subjects.next(subjects))
    ).subscribe();
  }

  getSubjects(): Observable<Subject[]> {
    if (this.subjects.value.length === 0) {
      this.fetchSubjects();
      return this.subjects.asObservable();
    }
    return this.subjects.asObservable();
  }

  fetchForms(): void {
    this.httpClient.get<Form[]>(`${this.apiURL}/forms`).pipe(
      // Update the forms BehaviorSubject
      tap((forms: Form[]) => this.forms.next(forms))
    ).subscribe();
  }

  getForms(): Observable<Form[]> {
    if (this.forms.value.length === 0) {
      this.fetchForms();
      return this.forms.asObservable();
    }
    return this.forms.asObservable();
  }

  fetchStreams(): void {
    this.httpClient.get<Stream[]>(`${this.apiURL}/streams`).pipe(
      // Update the streams BehaviorSubject
      tap((streams: Stream[]) => {
        const capitalizedStreams = streams.map(stream => {
          stream.name = stream.name.charAt(0).toUpperCase() + stream.name.slice(1);
          return stream;
        });
        this.streams.next(capitalizedStreams)})
    ).subscribe();
  }

  getStreams(): Observable<Stream[]> {
    if (this.streams.value.length === 0) {
      this.fetchStreams();
      return this.streams.asObservable();
    }
    return this.streams.asObservable();
  }

  editGrade(grade: Grade): Observable<Grade> {
    const gradeObject = {...grade};
    delete gradeObject._id;
    return this.httpClient.put<Grade>(`${this.apiURL}/grades/${grade._id}`, gradeObject);
  }

  editSubject(subject: Subject): Observable<Subject> {
    const subjectObject = {...subject};
    delete subjectObject._id;
    return this.httpClient.put<Subject>(`${this.apiURL}/subjects/${subject._id}`, subjectObject);
  }

  editForm(form: Form): Observable<Form> {
    const formObject = {...form};
    delete formObject._id;
    return this.httpClient.put<Form>(`${this.apiURL}/forms/${form._id}`, formObject);
  }

  editStream(stream: Stream): Observable<Stream> {
    const streamObject = {...stream};
    delete streamObject._id;
    return this.httpClient.put<Stream>(`${this.apiURL}/streams/${stream._id}`, streamObject);
  }

  addGrade(grade: Grade): Observable<Grade> {
    return this.httpClient.post<Grade>(`${this.apiURL}/grades`, grade);
  }

  addSubject(subject: Subject): Observable<Subject> {
    return this.httpClient.post<Subject>(`${this.apiURL}/subjects`, subject);
  }

  addForm(form: Form): Observable<Form> {
    return this.httpClient.post<Form>(`${this.apiURL}/forms`, form);
  }

  addStream(stream: Stream): Observable<Stream> {
    return this.httpClient.post<Stream>(`${this.apiURL}/streams`, stream);
  }

  deleteGrade(grade: Grade): Observable<Grade> {
    return this.httpClient.delete<Grade>(`${this.apiURL}/grades/${grade._id}`);
  }

  deleteSubject(subject: Subject): Observable<Subject> {
    return this.httpClient.delete<Subject>(`${this.apiURL}/subjects/${subject._id}`);
  }

  deleteForm(form: Form): Observable<Form> {
    return this.httpClient.delete<Form>(`${this.apiURL}/forms/${form._id}`);
  }

  deleteStream(stream: Stream): Observable<Stream> {
    return this.httpClient.delete<Stream>(`${this.apiURL}/streams/${stream._id}`);
  }
}

