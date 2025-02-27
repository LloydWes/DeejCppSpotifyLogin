import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';

export const routes: Routes = [
    { path: '*', component: LoginComponent},
    { path: 'login', component: LoginComponent},
    { path: 'callback', component: CallbackComponent},
    { path: '**', component: LoginComponent}
];
