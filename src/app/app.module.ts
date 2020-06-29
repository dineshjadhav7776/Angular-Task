import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatSortModule ,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
