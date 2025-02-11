import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    // { path: 'home', component: HomeComponent },
    // { path: 'questions-binary-one', component: QuestionsBinaryOneComponent, canActivate: [AuthGuard] },
    { path: '**', component: PageNotFoundComponent, title: 'Page Not Found' },
];
