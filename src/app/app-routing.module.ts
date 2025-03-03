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
import { GradeManagementComponent } from './components/teacher/grade-management/grade-management.component';
import { ResultsComponent } from './components/student/results/results.component';

import { authGuard } from './guards/auth.guard';
import { redirectIfAuthGuard } from './guards/redirect-if-auth.guard';
import { roleGuard } from './guards/role.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent, canActivate: [redirectIfAuthGuard]},
  {path: 'config', component: SystemComponent, canActivate: [authGuard, roleGuard], data: {roles: ['admin']}},
  {path: 'reports', component: AcademicReportsComponent, canActivate: [authGuard, roleGuard], data: {roles: ['admin', 'teacher']}},
  {path: 'reports/streams/:form', component: StreamsComponent, canActivate: [authGuard, roleGuard], data: {roles: ['admin', 'teacher']}},
  {path: 'teachers', component: TeachersComponent, canActivate: [authGuard, roleGuard], data: {roles: ['admin']}},
  {path: 'admins', component: AdminsComponent, canActivate: [authGuard, roleGuard], data: {roles: ['admin']}},
  {path: 'students', component: StudentsComponent, canActivate: [authGuard, roleGuard], data: {roles: ['admin', 'teacher']}},
  {path: 'profile', component: ProfileComponent, canActivate: [authGuard, roleGuard], data: {roles: ['admin', 'teacher', 'student']}},
  {path: 'classes', component: StudentManagementComponent, canActivate: [authGuard, roleGuard], data: {roles: ['teacher']}},
  {path: 'grades', component: GradeManagementComponent, canActivate: [authGuard, roleGuard], data: {roles: ['teacher']}},
  {path: 'results', component: ResultsComponent, canActivate: [authGuard, roleGuard], data: {roles: ['student']}},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
