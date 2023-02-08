import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './interceptor/auth.guard';

import { FormStudentComponent} from './pages/student/form-student/form-student.component';
import { FormTeacherComponent} from './pages/teacher/form-teacher/form-teacher.component';
import { HomeComponent} from './pages/home/home.component';
import { LoginComponent} from './pages/login/login.component';
import {TableStudentComponent} from './pages/student/table-student/table-student.component';
import { LoginLayoutComponent} from "./pages/login-layout/login-layout.component";
import { HomeLayoutComponent} from "./pages/home-layout/home-layout.component";
import { TableTeacherComponent } from './pages/teacher/table-teacher/table-teacher.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FormClassComponent } from "./pages/class/form-class/form-class.component";
import { TableClassComponent } from "./pages/class/table-class/table-class.component";
import { TableUserComponent } from './pages/users/table-user/table-user.component';
import { FormUserComponent } from './pages/users/form-user/form-user.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', data: {title: 'First Component'}, pathMatch: 'full'},
  {
    path: 'home', component: HomeLayoutComponent, data: {title: 'First Component'},
    children: [
      {path: '', component: HomeComponent}
    ]
  },
  {
    path: 'main', component: HomeLayoutComponent,
    children: [
    {
      path: 'contact',
      component: ContactComponent,
    },
    {path: '**', redirectTo: 'home'},
    {
      path: '',
      component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
      },
  ],
  },{
    path: 'main', component: HomeLayoutComponent ,
    children: [
                  {
        path: 'login',
        component: LoginLayoutComponent,
      },
      {
        path: 'cadastrostudent',
        component: FormStudentComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'cadastrostudent/:id',
        component: FormStudentComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'cadastroteacher',
        component: FormTeacherComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'cadastroclass',
        component: FormClassComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'cadastroclass/:id',
        component: FormClassComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'cadastroteacher/:id',
        component: FormTeacherComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'students',
        component: TableStudentComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'teachers',
        component: TableTeacherComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'classes',
        component: TableClassComponent,
      },
      {
        path: 'users',
        component: TableUserComponent,
        canActivate: [AuthGuard]
      },
      {
      path: 'cadastrouser',
      component: FormUserComponent,
      canActivate: [AuthGuard]
      },
      {
        path: 'cadastrouser/:id',
        component: FormUserComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
