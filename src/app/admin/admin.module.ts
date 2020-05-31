import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule }  from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule, 
    MatInputModule,
    MatFormFieldModule, 
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatIconModule,
  ],
  declarations: [AdminPageComponent]
})
export class AdminModule { }
