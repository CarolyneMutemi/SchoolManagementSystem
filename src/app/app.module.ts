import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SystemComponent } from './components/admin/system/system.component';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { HomeComponent } from './components/shared/home/home.component';
import { AcademicReportsComponent } from './components/shared/academic-reports/academic-reports.component';
import { StreamsComponent } from './components/shared/academic-reports/streams/streams.component';
import { TeachersComponent } from './components/admin/teachers/teachers.component';
import { SubjectMultiselectComponent } from './components/admin/teachers/subject-multiselect/subject-multiselect.component';
import { AdminsComponent } from './components/admin/admins/admins.component';
import { StudentsComponent } from './components/admin/students/students.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { TeacherSidebarComponent } from './components/teacher/teacher-sidebar/teacher-sidebar.component';
import { StudentManagementComponent } from './components/teacher/student-management/student-management.component';
import { GradeManagementComponent } from './components/teacher/grade-management/grade-management.component';
import { StudentSidebarComponent } from './components/student/student-sidebar/student-sidebar.component';
import { ResultsComponent } from './components/student/results/results.component';

import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SystemComponent,
    SidebarComponent,
    HomeComponent,
    AcademicReportsComponent,
    StreamsComponent,
    TeachersComponent,
    SubjectMultiselectComponent,
    AdminsComponent,
    StudentsComponent,
    ProfileComponent,
    TeacherSidebarComponent,
    StudentManagementComponent,
    GradeManagementComponent,
    StudentSidebarComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
