import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { CreateCourseComponent } from './components/course/create-course/create-course.component';
import { CreateJeopardyComponent } from './components/games/jeopardy/create-jeopardy/create-jeopardy.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [authGuard],
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard],
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'create-course',
        component: CreateCourseComponent,
        canActivate: [authGuard],
    },
    {
        path: 'create-jeopardy',
        component: CreateJeopardyComponent,
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent, 
    },
];
