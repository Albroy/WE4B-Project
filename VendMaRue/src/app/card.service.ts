import { Injectable } from '@angular/core';
import { Card } from '../classes/Card';
@Injectable({
  providedIn: 'root'
})
export class CardService {
  Array : Card[] = []
  constructor() { }

  getCards()  {
    this.Array.push(new Card(1, "Title 1", 0, "../assets/test.jpg", "Brand 1", 9.99, 0, 0, 1, new Date(), "Ville 1", "Lorem ipsum dolor sit amet, consectetur adipisicing elit."));
    this.Array.push(new Card(2, "Title 2", 0, "../assets/test.jpg", "Brand 2", 19.99, 10, 0, 2, new Date(), "Ville 2", "Lorem ipsum dolor sit amet, consectetur adipisicing elit."));
    this.Array.push(new Card(3, "Title 3", 0, "../assets/test.jpg", "Brand 3", 29.99, 20, 0, 3, new Date(), "Ville 3", "Lorem ipsum dolor sit amet, consectetur adipisicing elit."));
    this.Array.push(new Card(4, "Title 4", 0, "../assets/test.jpg", "Brand 4", 39.99, 30, 0, 4, new Date(), "Ville 4", "Lorem ipsum dolor sit amet, consectetur adipisicing elit."));
    this.Array.push(new Card(5, "Title 5", 0, "../assets/test.jpg", "Brand 5", 49.99, 40, 0, 5, new Date(), "Ville 5", "Lorem ipsum dolor sit amet, consectetur adipisicing elit."));
    this.Array.push(new Card(6, "Title 6", 0, "../assets/test.jpg", "Brand 6", 59.99, 50, 0, 6, new Date(), "Ville 6", "Lorem ipsum dolor sit amet, consectetur adipisicing elit."));
    this.Array.push(new Card(7, "Title 7", 0, "../assets/test.jpg", "Brand 7", 69.99, 60, 0, 7, new Date(), "Ville 7", "Lorem ipsum dolor sit amet, consectetur adipisicing elit."));
    this.Array.push(new Card(8, "Title 8", 0, "../assets/test.jpg", "Brand 8", 79.99, 70, 0, 8, new Date(), "Ville 8", "Lorem ipsum dolor sit amet, consectetur adipisicing elit."));
    this.Array.push(new Card(9, "Title 9", 0, "../assets/test.jpg", "Brand 9", 89.99, 80, 0, 9, new Date(), "Ville 9", "Lorem ipsum dolor sit amet, consectetur adipisicing elit."));
    this.Array.push(new Card(10, "Title 10", 0, "../assets/test.jpg", "Brand 10", 99.99, 90, 0, 10, new Date(), "Ville 10", "Lorem ipsum dolor sit amet, consectetur adipisicing elit."));
     return this.Array;
  }

}
