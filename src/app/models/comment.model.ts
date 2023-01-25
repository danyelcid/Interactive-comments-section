import { User } from './user.model';
import { Reply } from './reply.model';

export class Comment {

  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Reply[];

  constructor( comment: string, author: User, id?: number, createdAt?: string, score?: number)  {

    const date = new Date();
    const time = date.getTime();
    const createdDateStr = date.getFullYear()
                        + '-' + (date.getMonth() + 1)
                        + '-' + date.getDate()
                        + ' ' + date.getHours()
                        + ':' + date.getMinutes()
                        + ':' + date.getSeconds();
    if (id) {
      this.id = id;
    } else {
      this.id = time;
     }

    this.content = comment;

    if (createdAt) {
      this.createdAt = createdAt;
    } else {
      this.createdAt = createdDateStr;
    }

    if (score) {
      this.score = score;
    } else {
      this.score = 0;
    }

    this.user = author;

    this.replies = [];

  }
}
