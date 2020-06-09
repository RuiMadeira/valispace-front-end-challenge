import { Component, Input } from '@angular/core';
import { PostItemType } from 'src/app/models/post-item-type.enum';
import { PostItem } from 'src/app/models/post-item';
import { Mention } from 'src/app/models/mention';
import { Post } from 'src/app/models/post';
import { ManageEmployeeService } from '../../services/manage-employee/manage-employee.service';
import { EmployeeRole } from 'src/app/models/employee-role.enum';

const UNKNOWN_EMPLOYEE = 'Unknown employee';

@Component({
  selector: 'app-post-text',
  templateUrl: './post-text.component.html',
  styleUrls: ['./post-text.component.css']
})
export class PostTextComponent {
  // To be able to use enum in template
  PostItemType = PostItemType;
  @Input() post: Post;

  constructor(private manageEmployeeService: ManageEmployeeService) {}

  private isMention(item: string): boolean {
    const triggerChar = item.charAt(0);
    if (triggerChar !== '@' && triggerChar !== '#') {
      return false;
    }
    const possibleMention = JSON.parse(item.substring(1));
    return  ('id' in possibleMention) && ('field' in possibleMention);
  }

  public getListOfPostItems(postText: string): Array<PostItem> {
    if (!postText){
      return [];
    }
    return postText.split(/([@#]{.+})/).map(item => this.isMention(item) ?
      { type: PostItemType.Mention, value: JSON.parse(item.substring(1)) as Mention } :
      { type: PostItemType.Text, value: item});
  }

  public getMentionChipValue(mention: Mention): string {
    return this.manageEmployeeService.getEmployeeById(mention.id)?.[mention.field] ?? UNKNOWN_EMPLOYEE;
  }

  public getEmployeeInfo(mention: Mention): Array<number | string | EmployeeRole> {
    const employee = this.manageEmployeeService.getEmployeeById(mention.id);
    if (!employee) {
      return [];
    }
    return [employee.name, employee.username, employee.phone, employee.role];
  }

  public trackByIndex(index: number, _: PostItem) {
    return index;
  }
}
