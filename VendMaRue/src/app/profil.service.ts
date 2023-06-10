import { Injectable } from '@angular/core';
import { User } from "../classes/User";
import { UserService } from "./user.service";
@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  profil: User[] = []
  constructor(private service: UserService) {  
    this.service.getData().subscribe(data => {
      this.profil = data
    })
  }
  getUser(): User[] {
    return this.profil;
    }


  getUserById(id: number): User {
    const user: User[] = this.profil.filter(user => user.user_id === id);
    return user[0];
  }

}
