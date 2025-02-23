import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    StudentManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
