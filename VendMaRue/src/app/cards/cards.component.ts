import { Component,OnInit } from '@angular/core';
import { Card } from 'src/classes/Card';
import { CardService } from '../card.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit 
{
  CardArray : Card[] = []; 
  constructor(service : CardService) {
    this.CardArray = service.getCards();
   }
  ngOnInit(): void { }

}
