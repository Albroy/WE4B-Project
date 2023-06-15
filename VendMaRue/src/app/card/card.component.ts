import { Component,Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Card } from '../../classes/Card';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupCardComponent } from '../popup-card/popup-card.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card!: Card;
  @Input() showEditButton: boolean = false; // Par défaut, le bouton "Modifier" est masqué
  @Output() editCardEvent = new EventEmitter<Card>();


  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  openModal() {
    const modalRef = this.modalService.open(PopupCardComponent);
    modalRef.componentInstance.card = this.card;
    // console.log(this.card.id);
  }

  editCard() {
    this.editCardEvent.emit(this.card);
  }

}
