import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../classes/User';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  Array: User[] = [];
  list_length!: number

  constructor(private http: HttpClient) { }

  getData(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/Users')
  }
  getDataLength() {
    this.http.get<User[]>('http://localhost:3000/Users').subscribe(data => {
      this.list_length = (data).length
    })
  }
  addUser(User : User): Observable<User>{
    return this.http.post<User>('http://localhost:3000/Users', User)
  }

}
