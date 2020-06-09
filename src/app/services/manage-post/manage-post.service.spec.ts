import { TestBed } from '@angular/core/testing';

import { ManagePostService } from './manage-post.service';

describe('ManagePostService', () => {
  let service: ManagePostService;
  const testPosts = [
    { id: 1, employeeId: 1, text: 'New design screen posted', created: new Date(2020, 6, 3), edited: new Date(2020, 6, 9) },
    { id: 2, employeeId: 3, text: 'Can someone help me?, #{id: 1, field: \'phone\'}', created: new Date(2020, 6, 8), edited: undefined },
    { id: 3, employeeId: 2, text: 'Hello all, I\'m new here', created: new Date(2020, 5, 4), edited: new Date(2020, 6, 6) },
    { id: 4, employeeId: 1, text: 'Everybody welcome @{id: 2, field: \'username\'}', created: new Date(2020, 6, 7), edited: undefined },
  ];

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagePostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('post should be created', () => {
    expect(service.getPostList()).toEqual([]);
    service.createPost(testPosts[0]);
    const postList = service.getPostList();
    expect(postList.length).toEqual(1);
    expect(postList[0].text).toEqual(testPosts[0].text);
  });

  it('post should be edited', () => {
    expect(service.getPostList()).toEqual([]);
    service.createPost(testPosts[0]);
    const postList = service.getPostList();
    expect(postList.length).toEqual(1);
    expect(postList[0].text).toEqual(testPosts[0].text);
    service.editPost({ ...testPosts[0], text: 'New design screen posted, link here:' });
    const postListEdited = service.getPostList();
    expect(postListEdited.length).toEqual(1);
    expect(postListEdited[0].text).toEqual('New design screen posted, link here:');
  });

  it('post should be deleted', () => {
    expect(service.getPostList()).toEqual([]);
    service.createPost(testPosts[0]);
    expect(service.getPostList().length).toEqual(1);
    service.deletePost(testPosts[0]);
    expect(service.getPostList()).toEqual([]);
  });
});
