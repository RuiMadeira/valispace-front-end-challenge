import { Mention } from './mention';
import { PostItemType } from './post-item-type.enum';

export interface PostItem {
    type: PostItemType;
    value: string | Mention;
}
