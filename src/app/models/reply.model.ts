import { User } from './user.model';

export class Reply {

  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: User;

  constructor( comment: string, author: User, replyingTo?: string , id?: number, createdAt?: string, score?: number)  {

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

    if (replyingTo) {
      this.replyingTo = replyingTo;
    } else {
      this.replyingTo = '';
    }

    this.user = author;

  }
}
