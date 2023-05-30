import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../../classes/Card';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup-card',
  templateUrl: './popup-card.component.html',
  styleUrls: ['./popup-card.component.css'!]
})
export class PopupCardComponent implements OnInit {
  @Input() card!: Card;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  closeModal(): void {
    // Fermez le popup en utilisant la référence au modal
    this.activeModal.close();
  }
  decrement(){
    this.card.likes >0 ? this.card.likes -= 1 : "";
  }

  increment(){
    this.card.likes += 1;
  }

}
