import { Component, OnInit } from '@angular/core';
import { Card } from '../../classes/Card';
import { CardService } from '../card.service';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-mes-annonces',
  templateUrl: './mes-annonces.component.html',
  styleUrls: ['./mes-annonces.component.css']
})

export class MesAnnoncesComponent implements OnInit {
  cardlist: Card[] = [];
  userId: number; // ID de l'utilisateur

  constructor(
    private cardService: CardService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    this.userId = parseInt(this.activatedRoute.snapshot.params['id'], 10); // Récupérer l'ID de l'utilisateur à partir de l'URL

    this.cardService.getData().subscribe(data => {
      console.log(data); // Vérifiez si les annonces sont récupérées correctement
      this.cardlist = data.filter(card => card.userid === this.userId);
    });
  }

  ngOnInit() {

  }
}
