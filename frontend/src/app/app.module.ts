import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/core/home/home.component';
import { AuthorComponent } from './components/core/author/author.component';
import { AboutComponent } from './components/core/about/about.component';
import { FakultetComponent } from './components/fakultet/fakultet.component';
import { StatusComponent } from './components/status/status.component';
import { DepartmanComponent } from './components/departman/departman.component';
import { StudentComponent } from './components/student/student.component';
import { StatusDialogComponent } from './components/dialogs/status-dialog/status-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FakultetDialogComponent } from './components/dialogs/fakultet-dialog/fakultet-dialog.component';
import { DepartmanDialogComponent } from './components/dialogs/departman-dialog/departman-dialog.component';
import { StudentDialogComponent } from './components/dialogs/student-dialog/student-dialog.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthorComponent,
    AboutComponent,
    FakultetComponent,
    StatusComponent,
    DepartmanComponent,
    StudentComponent,
    StatusDialogComponent,
    FakultetDialogComponent,
    DepartmanDialogComponent,
    StudentDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatTableModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
