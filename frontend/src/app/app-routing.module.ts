import { AuthorComponent } from './components/core/author/author.component';
import { AboutComponent } from './components/core/about/about.component';
import { HomeComponent } from './components/core/home/home.component';

import { DepartmanComponent } from './components/departman/departman.component';
import { FakultetComponent } from './components/fakultet/fakultet.component';
import { StatusComponent } from './components/status/status.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    { path: 'status', component: StatusComponent},
    { path: 'fakultet', component: FakultetComponent},
    { path: 'departman', component: DepartmanComponent},
    { path: 'home', component: HomeComponent},
    { path: 'about', component: AboutComponent},
    { path: 'author', component: AuthorComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
