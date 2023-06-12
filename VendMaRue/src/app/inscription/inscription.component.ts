import { Component, OnInit } from '@angular/core';
import { User } from 'src/classes/User';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  public user: User;
  public mdp2: string;
  public error: String = "";


  submitted = false;
  loading = false;

  constructor(private userService: UserService, private router: Router) {
    this.user = new User(0, '../assets/images/user.png', '', '', '', 0, new Date(), '', '')
    this.user.id= this.userService.lastid;
    console.log("ID : " +this.userService.lastid)
    this.mdp2 = "";

  }

  ngOnInit(): void { }

  onSubmit() {
    this.submitted = true;
    console.log("submit button" + this.submitted)

    // stop here if form is invalid
    if (this.isFormValid().valid) {
      this.loading = true;
      this.addUser();
    }

    console.log("form valid " + this.loading + "//   error ", this.isFormValid());
  }
  addUser() {
    this.userService.addUser(this.user).subscribe(data => {
      this.user = data;
      console.log(this.user);
      this.router.navigateByUrl('');
    }
    )
  }
  isFormValid(): { valid: boolean, error: string } {
    const { user_name, user_surname, user_loc, user_email, user_pwd } = this.user;

    // Vérification des champs requis
    if (!user_name || !user_surname || !user_loc || !user_email || !user_pwd || !this.mdp2) {
      return { valid: false, error: "Veuillez remplir tous les champs." };
    }

    // Vérification de l'adresse email valide
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user_email)) {
      return { valid: false, error: "Veuillez entrer une adresse email valide." };
    }
    if (this.mdp2 !== user_pwd) {
      return { valid: false, error: "Les mots de passes ne correspondent pas." }
    }
    this.user.user_pwd = bcrypt.hashSync(this.user.user_pwd, 10);

    return { valid: true, error: "" };
  }

}

