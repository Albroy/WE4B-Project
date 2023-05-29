import { Injectable } from '@angular/core';
import { Card } from '../classes/Card';
@Injectable({
  providedIn: 'root'
})
export class CardService {
  Array : Card[] = []
  constructor() { }

  getCards()  {
    this.Array.push(new Card("../assets/test.jpg","UTBM","9.99","Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem eaque ut eveniet aut quis rerum."));
    this.Array.push(new Card("../assets/test.jpg","UTBM","9.99","Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem eaque ut eveniet aut quis rerum."));
    this.Array.push(new Card("../assets/test.jpg","UTBM","9.99","Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem eaque ut eveniet aut quis rerum."));
    this.Array.push(new Card("../assets/test.jpg","UTBM","9.99","Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem eaque ut eveniet aut quis rerum."));
    this.Array.push(new Card("../assets/test.jpg","UTBM","9.99","Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem eaque ut eveniet aut quis rerum."));
    this.Array.push(new Card("../assets/test.jpg","UTBM","9.99","Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem eaque ut eveniet aut quis rerum."));
    this.Array.push(new Card("../assets/test.jpg","UTBM","9.99","Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem eaque ut eveniet aut quis rerum."));
    this.Array.push(new Card("../assets/test.jpg","UTBM","9.99","Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem eaque ut eveniet aut quis rerum."));
    this.Array.push(new Card("../assets/test.jpg","UTBM","9.99","Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem eaque ut eveniet aut quis rerum."));
    this.Array.push(new Card("../assets/test.jpg","UTBM","9.99","Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem eaque ut eveniet aut quis rerum."));
    this.Array.push(new Card("../assets/test.jpg","UTBM","9.99","Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem eaque ut eveniet aut quis rerum."));


    return this.Array;
  }
}
