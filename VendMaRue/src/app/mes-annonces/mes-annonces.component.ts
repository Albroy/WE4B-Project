import { Component, OnInit } from '@angular/core';
import { Card } from '../../classes/Card';
import { CardService } from '../card.service';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../classes/User';
import { Router } from '@angular/router';



@Component({
  selector: 'app-mes-annonces',
  templateUrl: './mes-annonces.component.html',
  styleUrls: ['./mes-annonces.component.css']
})

export class MesAnnoncesComponent implements OnInit {
  user: User;
  cardlist: Card[] = [];
  userString: string | null = sessionStorage.getItem('user');
  pwd: string;
  userId: number = 0;
  showEditButton: boolean = false;



  constructor(private userService: UserService, private cardService: CardService,private router: Router) {
    this.pwd = "";
    if (this.userString) { // Si on est connecté
      this.user = JSON.parse(this.userString);
      console.log(this.user);
    } else {
      this.user = new User(0, "", "", "", "", 0, new Date(), "", "");
    }
  }

  ngOnInit() {
    if (this.userString) {
      this.user = JSON.parse(this.userString);
      this.userId = this.user.id;
    }

    this.cardService.getData().subscribe(data => {
      this.cardlist = data.filter(card => card.userid === this.userId);
    });

    // Activer l'affichage du bouton "Modifier"
    this.showEditButton = true;
  }
  editCard(card: Card) {
    const cardId = card.id;
    this.router.navigate(['/create-product', cardId]);
  }

}
