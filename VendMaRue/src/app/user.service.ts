import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../classes/User';
import {async, delay, Observable} from 'rxjs';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];
  list_length!: number;
  lastid:number=0;
  url :string ='http://localhost:3000/Users';
  constructor(private http: HttpClient) {
    this.getDataLength();
    this.getData();
  }

  getData(){
    this.http.get<User[]>(this.url).subscribe(users => {this.users=users; console.log("GETDATA ",this.users);});
  }

  getDataLength() {
      this.list_length = this.users.length;
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  async createUserSession(email: string, password: string) {
    console.log("Entrée fonction session : "+email+" "+password);
/*
    sessionStorage.getItem('user') ? sessionStorage.clear() : console.log("Pas de session");
*/

    await new Promise<void>((resolve) => {
      this.getData();
      console.log(this.users);
      resolve();
    });

    const user = this.users.find(u => u.user_email === email && bcrypt.compareSync(password, u.user_pwd));
    console.log("User found : "+ user);
    if (user) {
      console.log(" on crée la session User : " + user + " : compareSync : " + bcrypt.compareSync(password,user.user_pwd));
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
  updatePwd(id : number, user_pwd : string): Observable<User> {
    console.log("on est dans updatePwd et on a id : "+id + " password : "+ user_pwd);
    return this.http.patch<User>(this.url+`/${id}`,{user_pwd});
  }
  updateUser(id : number,user_pp:string,user_surname:string,user_name:string,user_phone:number,user_loc:string,user_desc:string): Observable<User> {
    //update SessionUser
    return this.http.patch<User>(this.url+`/${id}`, {user_pp,user_surname,user_name,user_phone,user_loc,user_desc});
  }
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(this.url+`/${id}`);
  }

}
