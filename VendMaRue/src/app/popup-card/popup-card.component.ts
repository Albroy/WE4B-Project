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
  currentRate = 0;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  closeModal(): void {
    // Fermez le popup en utilisant la référence au modal
    this.activeModal.close();
  }
  ajouterPanier(): void {
    this.card.quantity>0 ? this.card.quantity -=1 : "";
  }
  retirerPanier(): void {
    this.card.quantity +=1;
  }


}
