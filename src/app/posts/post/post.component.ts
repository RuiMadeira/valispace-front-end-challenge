import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/post';
import { ManageEmployeeService } from '../../services/manage-employee/manage-employee.service';
import { ManagePostService } from '../../services/manage-post/manage-post.service';
import { MentionConfig } from 'angular-mentions';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post: Post;
  @Input() isNewPost = false;
  @Output() created = new EventEmitter<boolean>();
  @Output() edited = new EventEmitter<boolean>();
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
  isEditing = false;
  isPreviewing = false;

  constructor(private managePostService: ManagePostService, private manageEmployeeService: ManageEmployeeService) {}

  private mentionSelect(item: any, triggerChar: string): string {
    if (triggerChar === '@') {
      return `${triggerChar}{"id": ${item.id}, "field": "username"}`;
    } else if (triggerChar === '#') {
      return `${triggerChar}{"id": ${item.id}, "field": "phone"}`;
    }
    return '';
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

  public getEmployeeUsernameFromId(id: number): string {
    return this.manageEmployeeService.getEmployeeById(id)?.username ?? 'Unknown employee';
  }

  public startEditing(): void {
    this.isEditing = true;
    this.isPreviewing = false;
  }

  public startPreviewing(): void {
    this.isPreviewing = true;
  }

  public newPost(): void {
    if (!this.post) {
      this.post = { id: undefined, employeeId: undefined, text: undefined, created: undefined, edited: undefined };
      this.isEditing = true;
    }
  }

  public onBlurNewPost(): void {
    if (this.isNewPost && this.post && !this.post.id && (!this.post.text || this.post.text === '')) {
      this.post = undefined;
      this.isEditing = false;
      this.isPreviewing = false;
    }
  }

  public cancelEditing(): void {
    if (this.isNewPost) {
      this.post = undefined;
    }
    this.isEditing = false;
    this.isPreviewing = false;
  }

  public createPost(): void {
    this.created.emit(this.managePostService.createPost(this.post));
    this.post = undefined;
    this.isEditing = false;
    this.isPreviewing = false;
  }

  public editPost(): void {
    this.edited.emit(this.managePostService.editPost(this.post));
    this.isEditing = false;
    this.isPreviewing = false;
  }
}
