import { Injectable } from '@angular/core';
import { Post } from 'src/app/models/post';

const POST_CURRENT_ID_KEY = 'postCurrentId';
const POST_LIST_KEY = 'postList';

@Injectable({
  providedIn: 'root'
})
export class ManagePostService {

  private getCurrentPostId(): number {
    const currentPostId = localStorage.getItem(POST_CURRENT_ID_KEY);
    return currentPostId ? Number.parseFloat(currentPostId) : 0;
  }

  public getPostList(): Array<Post> {
    return JSON.parse(localStorage.getItem(POST_LIST_KEY)) ?? [];
  }

  public createPost(postCreated: Post): boolean {
    const id = this.getCurrentPostId() + 1;
    const currentPostList = this.getPostList();
    const newPost = { ...postCreated, id, employeeId: 1, created: new Date() };
    localStorage.setItem(POST_CURRENT_ID_KEY, id.toString());
    localStorage.setItem(POST_LIST_KEY, JSON.stringify(currentPostList.concat(newPost)));
    return true;
  }

  public editPost(postEdited: Post): boolean {
    const newPostList = this.getPostList().map(post => post.id === postEdited.id ? { ...postEdited, edited: new Date() } : post);
    localStorage.setItem(POST_LIST_KEY, JSON.stringify(newPostList));
    return true;
  }
}
