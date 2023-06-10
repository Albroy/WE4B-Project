import { Component,OnInit } from '@angular/core';
import { User } from 'src/classes/User';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit{
  public user: User;

  constructor(private userService: UserService, private router: Router) {
    console.log(this.userService.getDataLength() + " : " + this.userService.list_length + 1 + " : " );
    this.user = new User(0,'../assets/images/user.png', '', '', '', 0, new Date(), '', '')
    this.user.user_id = 6;
    console.log(this.user.user_id);
    console.log(this.user)
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.user)
  }

  addUser() {
    this.userService.addUser(this.user).subscribe(data => {
      this.user = data
      console.log(this.user)
    })
  // this.router.navigateByUrl('')
  }
  

}
