import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule }  from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule, MatInputModule, MatFormFieldModule, MatPaginatorModule, MatSortModule, MatTableModule,
  ],
  declarations: [AdminPageComponent]
})
export class AdminModule { }
