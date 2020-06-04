import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsPageComponent } from './posts-page/posts-page.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [PostsPageComponent],
  imports: [
    CommonModule,
    MatCardModule,
  ]
})
export class PostsModule { }
