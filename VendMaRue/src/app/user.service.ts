import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../classes/User';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  Array : User[] = [];

  constructor(private http : HttpClient) {}

  getData() : Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/Users')
  }
}
