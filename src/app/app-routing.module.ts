import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/auth/login/login.component';
import { SystemComponent } from './components/admin/system/system.component';
import { HomeComponent } from './components/shared/home/home.component';
import { AcademicReportsComponent } from './components/shared/academic-reports/academic-reports.component';
import { StreamsComponent } from './components/shared/academic-reports/streams/streams.component';
import { TeachersComponent } from './components/admin/teachers/teachers.component';
import { AdminsComponent } from './components/admin/admins/admins.component';
import { StudentsComponent } from './components/admin/students/students.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { StudentManagementComponent } from './components/teacher/student-management/student-management.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'config', component: SystemComponent},
  {path: 'reports', component: AcademicReportsComponent},
  {path: 'reports/streams/:form', component: StreamsComponent},
  {path: 'teachers', component: TeachersComponent},
  {path: 'admins', component: AdminsComponent},
  {path: 'students', component: StudentsComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'my-classes', component: StudentManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
