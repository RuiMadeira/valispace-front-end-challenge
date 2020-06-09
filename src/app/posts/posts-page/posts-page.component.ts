import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { OperationResult } from 'src/app/models/operation-result';
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
  postsList: Array<Post> = [];

  constructor(private managePostService: ManagePostService, private manageEmployeeService: ManageEmployeeService,
              private snackBar: MatSnackBar) {
    // Create 100 posts
    // const posts = Array.from({length: 100}, (_, k) => createNewPost(k + 1));
    // this.postsList = posts;
  }

  ngOnInit(): void {
    this.postsList = this.managePostService.getPostListOrderByRecent();
  }

  public postsChanged(operationResult: OperationResult): void {
    this.postActionBehaviour(operationResult.result, operationResult.message);
  }

  private postActionBehaviour(condition: boolean, message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000 });
    if (condition) {
      this.postsList = this.managePostService.getPostListOrderByRecent();
    }
  }

  public trackById(_, item: Post) {
    return item.id;
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
