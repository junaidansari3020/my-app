import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'forgot-password', component: ForgotPasswordComponent, title: 'Forgot Password' },
    { path: 'reset-password', component: ResetPasswordComponent, title: 'Reset Password' },
    { 
        path: '', 
        component: LayoutComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
            { path: 'employee', component: EmployeeComponent, title: 'Employee' },
            { path: 'add-employee', component: AddEmployeeComponent, title: 'Add Employee' },
            { path: 'edit-employee', component: EditEmployeeComponent, title: 'Edit Employee' },
        ]
    },
    { path: '**', component: PageNotFoundComponent, title: 'Page Not Found' },
];
