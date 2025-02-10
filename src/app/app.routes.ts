import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    // { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    // { path: 'dashboard', component: DashboardComponent },
    // { path: 'home', component: HomeComponent },
    // { path: 'about', component: AboutComponent },
    // { path: 'questions-binary-one', component: QuestionsBinaryOneComponent, canActivate: [AuthGuard] },
    // { path: '**', component: PageNotFoundComponent },
];
