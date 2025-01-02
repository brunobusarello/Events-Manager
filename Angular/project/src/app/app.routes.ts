import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/modules/dashboard/dashboard.component';
import { ManageusersComponent } from './components/modules/manageusers/manageusers.component';
import { privilegiesGuard } from './guards/privilegies.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            {
                path: 'users',
                component: ManageusersComponent,
                canActivate: [privilegiesGuard]
            }
        ]
    },
    { path: '**', redirectTo: "home", pathMatch: 'full' },
];
