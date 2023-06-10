import { Component,Input,OnInit } from '@angular/core';
import {User} from "../../classes/User";
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { CardService } from '../card.service';
import { Card } from 'src/classes/Card';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit{
  @Input() user !: User;
  userlist : User[] = [];
  cardlist : Card[] = [];
  user_idx :number;

  constructor(private activatedroute : ActivatedRoute, private userService : UserService,private cardService : CardService) {
    this.user_idx = parseInt(this.activatedroute.snapshot.params['id'].slice(1), 10);

    //Chargement du profil de l'utilisateur
    console.log(this.user_idx + " user id");
    this.userService.getData().subscribe(data => {
      this.userlist = data;
      for (let i = 0; i < this.userlist.length; i++) {
        if (this.userlist[i].user_id === this.user_idx) {
          console.log("found");
          this.user = this.userlist[i];
          break;
        }
      }

      
    });
    

  //Chargement des posts de l'utilisateur
  this.cardService.getData().subscribe(data => {
    this.cardlist = data;
  
    this.cardlist = this.cardlist.filter(card => card.userid === this.user_idx);
  
    console.log(this.cardlist.length + " cards trouvées");
  });
  

  }
  ngOnInit() {
  }
}
