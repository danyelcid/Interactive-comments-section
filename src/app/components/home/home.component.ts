import { Component, TemplateRef, Input } from '@angular/core';
import { PaisesService } from 'src/app/services/paises.service';
import { Comment } from '../../models/comment.model';
import { User } from '../../models/user.model';
import { Reply } from '../../models/reply.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  modalRef?: BsModalRef;
  message?: string;
  constructor(
    public commentS: PaisesService,
    public bsModalService: BsModalService
  ) {}

  openModal(template: TemplateRef<any>, comm: Comment, rep?: Reply) {
    this.modalRef = this.bsModalService.show(template, { class: 'modal-md' });
    const input = document.querySelector('input[type="hidden"]');

    if (rep) {
      input.setAttribute('data-comment', comm.id.toString());
      input.setAttribute('data-reply', rep.id.toString());
    } else {
      input.setAttribute('data-comment', comm.id.toString());
    }
  }

  confirm(input: any): void {
    if (input.getAttribute('data-reply')){
      this.commentS.deleteCommentReply(input.getAttribute('data-comment'), input.getAttribute('data-reply'));
    }else{
      this.commentS.deleteComment(input.getAttribute('data-comment'));
    }

    this.modalRef?.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }

  addComment(text) {
    if (text.value) {
      this.commentS.addComment(text.value);
      text.value = '';
    }
  }

  addReply(comme: Comment, author: User, replayText, id: number) {
    if (replayText.value) {
      this.commentS.addreply(comme, author.username, replayText.value);

      replayText.value = '';

      this.toggleReplyBox(id.toString());
    }
  }

  toggleReplyBox(id: string) {
    const selector = 'reply-box' + id;
    const divc = document.getElementById(selector);

    divc.classList.toggle('d-flex');
  }

  toggleEditCommet(id: number) {
    const selectedit = '#edit' + id;
    const selectcontent = '#content' + id;

    const editor = document.querySelector(selectedit);
    const content = document.querySelector(selectcontent);

    content.classList.toggle('hidden');
    editor.classList.toggle('hidden');
  }

  editContent(textContent, comm: Comment, rep?: Reply) {
    if (textContent.value) {
      const text = textContent.value;

      if (rep) {
        this.commentS.editContent(text, comm, rep);
        this.toggleEditCommet(rep.id);
      } else {
        this.commentS.editContent(text, comm);
        this.toggleEditCommet(comm.id);
      }
    }
  }

  delete(comm: Comment, rep?: Reply) {
    this.bsModalService._showModal('template');
  }
}
