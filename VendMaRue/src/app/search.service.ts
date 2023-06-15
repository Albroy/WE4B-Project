import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from 'src/classes/Card';
import { User } from 'src/classes/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getSearch(search: string): Observable <(User|Card)[]> {
    return this.http.get<(User|Card)[]>("http://localhost:3000/search/"+search);
  }
  getUser(search : string): Observable <User[]> {
    return this.http.get<User[]>(`http://localhost:3000/Users`);
  }
}
