import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';

export const routes: Routes = [
     { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {path: 'music/:id', loadComponent: () => import('./music/music').then(m => m.MusicComponent)},
];
