import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from '../app/admin/admin-page/admin-page.component';
import { PostsPageComponent } from '../app/posts/posts-page/posts-page.component';

const routes: Routes = [
  { path: 'admin', component: AdminPageComponent },
  { path: '', component: PostsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
