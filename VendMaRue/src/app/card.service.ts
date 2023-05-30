import { Injectable } from '@angular/core';
import { Card } from '../classes/Card';
@Injectable({
  providedIn: 'root'
})
export class CardService {
  Array : Card[] = []
  constructor() { }

  getCards()  {
    this.Array.push(new Card(1,0,"../assets/test.jpg","UTBM",9.99,0,"Lorem, ipsum dolor sit amet conUUUUUUUUUUUUUUUUUUUUUUUUUUUUU UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUsectetur adipisicing elit. Veniam quidem eaque ut eveniet aut quis rerum."));
    this.Array.push(new Card(2,0,"../assets/test.jpg","UTBM",9.99,10,"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem eaque ut eveniet aut quis rerum."));
    this.Array.push(new Card(3,0,"../assets/test.jpg","UTBM",50,50,"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem eaque ut eveniet aut quis rerum."));
    this.Array.push(new Card(4,0,"../assets/test.jpg","UTBM",50,80,"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem eaque ut eveniet aut quis rerum."));
    this.Array.push(new Card(0,0,"../assets/test.jpg","UTBM",50,26,"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem eaque ut eveniet aut quis rerum."));
    


    return this.Array;
  }
}
