import { Component, Input, OnInit } from '@angular/core';
import { User } from "../../classes/User";
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { CardService } from '../card.service';
import { Card } from 'src/classes/Card';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  @Input() user !: User;
  userlist: User[] = [];
  cardlist: Card[] = [];
  user_idx: number;

  constructor(private activatedroute: ActivatedRoute, private userService: UserService, private cardService: CardService, private datePipe: DatePipe) {
    this.user_idx = parseInt(this.activatedroute.snapshot.params['id'].replace(':', ''), 10);
  }

  ngOnInit() {
    // console.log(sessionStorage.getItem('user'));

    //Chargement du profil de l'utilisateur

    this.userService.getUser().subscribe(data => {
      this.userlist = data;
      for (let i = 0; i < this.userlist.length; i++) {
        if (this.userlist[i].id === this.user_idx) {
          this.user = this.userlist[i];
          break;
        }
      }


    });
    /*this.userlist = this.userService.users;
    for (let i = 0; i < this.userlist.length; i++) {
      if (this.userlist[i].id === this.user_idx) {
        console.log("found");
        this.user = this.userlist[i];
        break;
      }
    }*/


    //Chargement des posts de l'utilisateur
    this.cardService.getData().subscribe(data => {
      this.cardlist = data;

      this.cardlist = this.cardlist.filter(card => card.userid === this.user_idx);

      /*console.log(this.cardlist.length + " cards trouvées");*/
    });
  }
}
