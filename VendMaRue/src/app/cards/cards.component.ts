import { Component, OnInit } from '@angular/core';
import { Card } from 'src/classes/Card';
import { CardService } from '../card.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  CardArray: Card[] = [];
  constructor(private service: CardService) {
    this.service.getData().subscribe(data => {
      this.CardArray = data
    })
  };

  ngOnInit(): void { }

}
