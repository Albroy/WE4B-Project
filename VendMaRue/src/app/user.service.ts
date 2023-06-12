import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../classes/User';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];
  list_length!: number;
  lastid:number=0;

  constructor(private http: HttpClient) {
    this.getDataLength();
    this.getData().subscribe(users => {
      this.users = users;
    });
  }

  getData(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/Users');
  }
  getMaxid():void{
    this.getData().subscribe(data=>{
      let last :any = data[data.length-1]
      this.lastid= last.id
    })
  }
  getDataLength() {
    this.getData().subscribe(data => {
      this.list_length = data.length;
    });
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/Users', user);
  }

  createUserSession(email: string, password: string) {
    const user = this.users.find(u => u.user_email === email && bcrypt.compareSync(password,u.user_pwd));
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  }

  checkUserSession(): boolean {
    const user = sessionStorage.getItem('user');
    
    if (user) {
      const userUsed: User = JSON.parse(user);
      const exist = this.users.some(u => u.user_email === userUsed.user_email && u.user_pwd === userUsed.user_pwd);
      if (exist) {
        // console.log("données de session valides");
        return true;
      } else {
        // console.log("données de session invalides");
        this.deleteUserSession();
        return false;
      }
    }
    // console.log("pas de données de session");
    return false;
  }
  

  getUserId() {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const id = user.id;
      return id;
    }
  }

  getUserSurname() {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const surname = user.user_surname;
      return surname;
    }
  }

  deleteUserSession() {
    if (sessionStorage.getItem('user')) {
      sessionStorage.removeItem('user');
    }
  }
}
