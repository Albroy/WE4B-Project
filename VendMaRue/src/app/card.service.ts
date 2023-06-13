import { Injectable } from '@angular/core';
import { Card } from '../classes/Card';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  Array : Card[] = []
  constructor(private http:HttpClient) { }


  getData() : Observable<Card[]> {
    return this.http.get<Card[]>('http://localhost:3000/Cards')
  }

  addCard(card: Card): Observable<Card> {
    return this.http.post<Card>('http://localhost:3000/Cards', card);
  }

}
