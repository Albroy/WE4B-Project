import { Component,OnInit,Input} from '@angular/core';
import { Card } from '../../classes/Card';

@Component({
  selector: 'app-popup-card',
  templateUrl: './popup-card.component.html',
  styleUrls: ['./popup-card.component.css']
})
export class PopupCardComponent implements OnInit {
  @Input() card!: Card;
  constructor() {};
  ngOnInit(): void {};
}
