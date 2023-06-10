import { Component,Input,OnInit } from '@angular/core';
import {User} from "../../classes/User";
import {ProfilService} from "../profil.service";
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit{
  @Input() user !: User;
  userlist : User[] = [];
  user_idx :number;

  constructor(private activatedroute : ActivatedRoute, private userService : UserService) {
    this.user_idx = parseInt(this.activatedroute.snapshot.params['id'].slice(1), 10);

    console.log(this.user_idx);
    this.userService.getData().subscribe(data => {
      this.userlist = data;
      for (let i = 0; i < this.userlist.length; i++) {
        // console.log(this.userlist[i].user_id + " : " +this.user_idx);
        if (this.userlist[i].user_id === this.user_idx) {
          console.log("found");
          this.user = this.userlist[i];
          break;
        }
      }

      
    });
    

    

  }
  ngOnInit() {
  }
}
