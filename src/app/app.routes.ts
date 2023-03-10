import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


export const ROUTES: Routes = [
    {path: 'home', component: HomeComponent},
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: '**', pathMatch: 'full', redirectTo: 'home'},
];
