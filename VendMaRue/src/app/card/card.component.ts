import { Component,Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Card } from '../../classes/Card';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupCardComponent } from '../popup-card/popup-card.component';
import { UserService } from '../user.service';
import { User } from 'src/classes/User';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card!: Card;
  @Input() showEditButton: boolean = false;
  @Input() showDeleteButton: boolean = false;
  @Output() editCardEvent = new EventEmitter<Card>();
  @Output() deleteCardEvent = new EventEmitter<Card>();

  users: User[] = [];

  constructor(private modalService: NgbModal, private userService: UserService) { }


  ngOnInit(): void {
    this.users = this.userService.users;
    // console.log(this.users);
  }


  openModal() {
    const modalRef = this.modalService.open(PopupCardComponent);
    modalRef.componentInstance.card = this.card;
    // console.log(this.card.id);
  }

  editCard() {
    this.editCardEvent.emit(this.card);
  }

  deleteCard(card: Card) {
    // Appeler la méthode deleteCardEvent avec la carte en tant que paramètre
    this.deleteCardEvent.emit(this.card);
  }

}
