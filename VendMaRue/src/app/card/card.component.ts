import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Card } from '../../classes/Card';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupCardComponent } from '../popup-card/popup-card.component';
import { UserService } from '../user.service';
import { User } from 'src/classes/User';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() card!: Card;
  @Input() showEditButton: boolean = false;
  @Output() editCardEvent = new EventEmitter<Card>();
  users: User[] = [];

  constructor(
    private modalService: NgbModal,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.users = this.userService.users;
    // console.log(this.users);
  }

  getUserById(id: number): User { // à remplacer plus tard, car pas très beau
   let tmp: User| undefined = this.users.find((user) => user.id === id);
   return tmp ? tmp : new User(0, "", "DeletedUser", "DeletedUser", "DeletedUser", 0, new Date(), "", "");;
  }

  openModal() {
    const modalRef = this.modalService.open(PopupCardComponent);
    modalRef.componentInstance.card = this.card;
    modalRef.componentInstance.user = this.getUserById(this.card.userid);
    // console.log(this.card.id);
  }

  editCard() {
    this.editCardEvent.emit(this.card);
  }
}
