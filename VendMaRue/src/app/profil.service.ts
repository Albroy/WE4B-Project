import { Injectable } from '@angular/core';
import {User} from "../classes/User";

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  profil: User[] = []
  constructor() {
    this.profil.push(new User(1, "user1_pp", "John", "Doe", "john@example.com", 1234567890, new Date(), "City 1", "Description 1"));
    this.profil.push(new User(2, "user2_pp", "Jane", "Smith", "jane@example.com", 9876543210, new Date(), "City 2", "Description 2"));
    this.profil.push(new User(3, "user3_pp", "Bob", "Johnson", "bob@example.com", 5555555555, new Date(), "City 3", "Description 3"));
    this.profil.push(new User(4, "user4_pp", "Alice", "Brown", "alice@example.com", 1111111111, new Date(), "City 4", "Description 4"));
    this.profil.push(new User(5, "user5_pp", "Mike", "Davis", "mike@example.com", 9999999999, new Date(), "City 5", "Description 5"));

  }
  getUser(){
    return this.profil;
  }

  getUserById(id: number):User {
      const user: User[] = this.profil.filter(user => user.user_id === id);
      return user[0];
  }

}
