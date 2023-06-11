import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import * as bcrypt from 'bcryptjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  mail: string = "";
  mdp: string = "";
  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.mail && this.mdp) {
      this.mail = this.mail.toString();
      //this.mdp = bcrypt.hashSync(this.mdp, 10); 
      // pb mdp à corriger => voir inscription.component.ts
      this.userService.createUserSession(this.mail, this.mdp);
      console.log(this.mail, this.mdp);
      this.router.navigateByUrl('');
    }
  }
  

}
