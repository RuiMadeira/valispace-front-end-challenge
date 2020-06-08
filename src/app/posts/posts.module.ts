import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsPageComponent } from './posts-page/posts-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MentionModule } from 'angular-mentions';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { PostTextComponent } from './post-text/post-text.component';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [PostsPageComponent, PostTextComponent, PostComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MentionModule,
    MatTabsModule,
    FormsModule,
    MatChipsModule,
    SatPopoverModule,
  ]
})
export class PostsModule { }
