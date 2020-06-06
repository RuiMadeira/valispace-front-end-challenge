import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { Post } from 'src/app/models/post';
import { ManageEmployeeService } from '../../services/manage-employee/manage-employee.service';
import { ManagePostService } from '../../services/manage-post/manage-post.service';
import { MatSnackBar } from '@angular/material/snack-bar';

const TEXT_PIECES: string[] = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Proin magna metus, venenatis sed sem id, dignissim pulvinar neque. Ut sed velit in massa fringilla iaculis.',
  'Morbi tincidunt imperdiet ex sed lacinia. Cras augue ligula, vulputate sed tincidunt rutrum, sagittis non neque.',
  'Donec pellentesque aliquam est, viverra imperdiet dui semper quis. Sed eu ipsum eget ex hendrerit blandit sed nec neque. Donec eget libero eros.'
];

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.css']
})
export class PostsPageComponent implements OnInit {
  postsList: Array<Post>;
  postSelected: Post;

  constructor(private managePostService: ManagePostService, private manageEmployeeService: ManageEmployeeService,
              private snackBar: MatSnackBar) {
    // Create 100 post
    const posts = Array.from({length: 100}, (_, k) => createNewPost(k + 1));
    this.postsList = posts;
  }

  ngOnInit(): void {
    // this.postsList = this.managePostService.getPostList();
  }

  public selectPostForEdit(post: Post): void {
    this.postSelected = { ...post };
  }

  public newPost(): void {
    if (!this.postSelected) {
      this.postSelected = { id: undefined, employeeId: undefined, text: undefined, created: undefined, edited: undefined };
    }
  }

  public addPost(): void {
    this.postActionBehaviour(this.managePostService.createPost(this.postSelected),
      'Employee added successfully',  'Error adding employee');
  }

  public editSelectedPost(): void {
    this.postActionBehaviour(this.managePostService.editPost(this.postSelected),
      'Employee edited successfully',  'Error editing employee');
  }

  public cancelEditing(): void {
    this.postSelected = undefined;
  }

  private postActionBehaviour(condition: boolean, messageSuccess: string, messageFailure: string): void {
    if (condition) {
      this.snackBar.open(messageSuccess, 'Close', { duration: 3000 });
      this.postSelected = undefined;
    } else {
      this.snackBar.open(messageFailure, 'Close', { duration: 3000 });
    }
  }
}

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function createNewPost(id: number): Post {
  const text = TEXT_PIECES[Math.round(Math.random() * (TEXT_PIECES.length - 1))]
  + TEXT_PIECES[Math.round(Math.random() * (TEXT_PIECES.length - 1))]
  + TEXT_PIECES[Math.round(Math.random() * (TEXT_PIECES.length - 1))];
  const created = randomDate(new Date(2019, 0, 1), new Date());
  const edited = randomDate(new Date(2020, 6, 1), new Date());

  return { id, employeeId: id,  text, created, edited };
}
