import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../classes/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost/user.php'
  constructor(private http : HttpClient) {}

  getUser(){
    return this.http.get(this.url);
  }

}
