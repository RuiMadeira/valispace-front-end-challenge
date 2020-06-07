import { Component, OnInit } from '@angular/core';
import { PostItem } from 'src/app/models/post-item';
import { PostItemType } from 'src/app/models/post-item-type.enum';
import { Post } from 'src/app/models/post';
import { ManageEmployeeService } from '../../services/manage-employee/manage-employee.service';
import { ManagePostService } from '../../services/manage-post/manage-post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MentionConfig } from 'angular-mentions';
import { Mention } from 'src/app/models/mention';

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
  // To be able to use enum in template
  PostItemType = PostItemType;
  postsList: Array<Post> = [];
  postSelected: Post;
  mentionConfig: MentionConfig = {
    mentions: [
      {
          items: [],
          labelKey: 'username',
          triggerChar: '@',
          returnTrigger: true,
          mentionSelect: this.mentionSelect,
      },
      {
          items: [],
          labelKey: 'phone',
          triggerChar: '#',
          returnTrigger: true,
          mentionSelect: this.mentionSelect,
      },
    ],
  };

  constructor(private managePostService: ManagePostService, private manageEmployeeService: ManageEmployeeService,
              private snackBar: MatSnackBar) {
    // Create 100 posts
    // const posts = Array.from({length: 100}, (_, k) => createNewPost(k + 1));
    // this.postsList = posts;
  }

  ngOnInit(): void {
    this.postsList = this.managePostService.getPostList();
  }

  public getEmployeeUsernameFromId(id: number): string {
    return this.manageEmployeeService.getEmployeeById(id)?.username ?? 'Unknown employee';
  }

  private isMention(item: string): boolean {
    const triggerChar = item.charAt(0);
    if (triggerChar !== '@' && triggerChar !== '#') {
      return false;
    }
    const possibleMention = JSON.parse(item.substring(1));
    return  ('id' in possibleMention) && ('field' in possibleMention);
  }

  public getListOfPostItems(postText: string): Array<PostItem> {
    return postText.split(/([@#]{.+})/).map(item => this.isMention(item) ?
      { type: PostItemType.Mention, value: JSON.parse(item.substring(1)) as Mention } :
      { type: PostItemType.Text, value: item});
  }

  public getMentionList(searchTerm: string) {
    const triggerChar = searchTerm.charAt(0);
    let items = [];
    if (triggerChar === '@') {
      items = this.manageEmployeeService.getEmployeesByUsername(searchTerm.substring(1));
    } else if (triggerChar === '#') {
      items = this.manageEmployeeService.getEmployeesByPhone(searchTerm.substring(1));
    }
    this.mentionConfig = {
      ...this.mentionConfig,
      mentions: this.mentionConfig.mentions.map(mention => mention.triggerChar === triggerChar ? { ...mention, items} : mention)
    };
  }

  public getMentionChipValue(mention: Mention): string {
    return this.manageEmployeeService.getEmployeeById(mention.id)[mention.field];
  }

  public selectPostForEdit(post: Post): void {
    this.postSelected = { ...post };
  }

  public newPost(): void {
    if (!this.postSelected) {
    this.postSelected = { id: undefined, employeeId: undefined, text: undefined, created: undefined, edited: undefined };
    }
  }

  public onBlurNewPost(): void {
    if (this.postSelected && !this.postSelected.id && (!this.postSelected.text || this.postSelected.text === '')) {
      this.postSelected = undefined;
    }
  }

  public addPost(): void {
    this.postActionBehaviour(this.managePostService.createPost(this.postSelected),
      'Post created successfully',  'Error creating post');
  }

  public editSelectedPost(): void {
    this.postActionBehaviour(this.managePostService.editPost(this.postSelected),
      'Post edited successfully',  'Error editing post');
  }

  public cancelEditing(): void {
    this.postSelected = undefined;
  }

  private mentionSelect(item: any, triggerChar: string): string {
    if (triggerChar === '@') {
      return `${triggerChar}{"id": ${item.id}, "field": "username"}`;
    } else if (triggerChar === '#') {
      return `${triggerChar}{"id": ${item.id}, "field": "phone"}`;
    }
    return '';
  }

  private postActionBehaviour(condition: boolean, messageSuccess: string, messageFailure: string): void {
    if (condition) {
      this.snackBar.open(messageSuccess, 'Close', { duration: 3000 });
      this.postSelected = undefined;
      this.postsList = this.managePostService.getPostList();
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
