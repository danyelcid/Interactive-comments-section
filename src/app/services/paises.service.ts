import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Comment } from '../models/comment.model';
import { Reply } from '../models/reply.model';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  logedUser: User;
  commentsList: Comment[] = [];

  constructor(private http: HttpClient) {
    if (!localStorage.getItem('user')) {
      this.http.get('/assets/data.json').subscribe((data: JSON) => {
        const currentUser = new User(
          data['currentUser'].username,
          data['currentUser'].image
        );

        this.logedUser = currentUser;

        for (const item of data['comments']) {
          const user = new User(item['user'].username, item['user'].image);

          const comment = new Comment(
            item.content,
            user,
            item.id,
            item.createdAt,
            item.score
          );

          if (item['replies'].length > 0) {
            for (const reply of item['replies']) {
              const repUser = new User(
                reply['user'].username,
                reply['user'].image
              );

              const commReply = new Reply(
                reply.content,
                repUser,
                reply.replyingTo,
                reply.id,
                reply.createdAt,
                reply.score
              );
              comment.replies.push(commReply);
            }
          }
          this.commentsList.push(comment);
        }
        this.storageSave();
      });
    } else {
      this.storageLoad();
    }
  }

  storageSave() {
    const userStr = JSON.stringify(this.logedUser);
    const commentsStr = JSON.stringify(this.commentsList);

    localStorage.setItem('user', userStr);
    localStorage.setItem('commentsList', commentsStr);
  }

  storageLoad() {
    this.logedUser = JSON.parse(localStorage.getItem('user'));
    this.commentsList = JSON.parse(localStorage.getItem('commentsList'));
  }

  addComment(text: string) {
    const comment = new Comment(text, this.logedUser);

    this.commentsList.push(comment);

    this.storageSave();
  }

  deleteComment(id: string) {
    const comm = this.commentsList.find((comment) => {
      return comment.id === Number(id);
    });

    const i = this.commentsList.indexOf(comm);

    this.commentsList.splice(i, 1);
    this.storageSave();
  }

  deleteCommentReply(cid: string, rid: string) {
    const comm = this.commentsList.find((comment) => {
      return comment.id === Number(cid);
    });

    const repp = comm.replies.find((reply) => {
      return reply.id === Number(rid);
    });


    const i = this.commentsList.indexOf(comm);

    const j = this.commentsList[i].replies.indexOf(repp);

    this.commentsList[i].replies.splice(j, 1);

    this.storageSave();

  }

  editContent(textValue: string, comment: Comment, reply?: Reply) {
    if (reply) {
      reply.content = textValue;
    } else {
      comment.content = textValue;
    }

    this.storageSave();
  }

  setScore(comment: Comment, value: number) {
    comment.score = comment.score + value;

    this.storageSave();
  }
  setReplyScore(rep: Comment, value: number) {
    rep.score = rep.score + value;

    this.storageSave();
  }

  addreply(c: Comment, replyingTo: string, replyText: string) {
    const newreply = new Reply(replyText, this.logedUser, replyingTo);

    c.replies.push(newreply);

    this.storageSave();
  }
}
