import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SearchService } from '../search.service';
import { User } from 'src/classes/User';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Card } from 'src/classes/Card';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupCardComponent } from '../popup-card/popup-card.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchValue: string = "";
  users: User[] = [];
  cards: Card[] = [];
  searchForm: FormGroup = this.fb.nonNullable.group({
    searchValue: '',
  });
  hasValue: boolean = false;
  constructor(private searchService: SearchService, private fb: FormBuilder, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  /**
   * Effectue une recherche en utilisant la valeur de recherche actuelle.
   * Récupère les utilisateurs et les cartes correspondant à la valeur de recherche.
   * Filtré les résultats pour n'inclure que ceux qui correspondent à la valeur de recherche.
   */
  fetchData(): void {
    // Vérifier si une valeur de recherche est présente
    if (this.searchValue.length > 0) {
      this.hasValue = true;
      const searchValueLower = this.searchValue.toLowerCase();

      // Appel des services pour récupérer les utilisateurs et les cartes
      const users$ = this.searchService.getUser(this.searchValue);
      const cards$ = this.searchService.getCards(this.searchValue);

      // Utilisation de forkJoin pour attendre les résultats des deux appels de service
      forkJoin([users$, cards$]).subscribe(results => {
        const users = results[0];
        const cards = results[1];

        // Filtrer les utilisateurs qui correspondent à la valeur de recherche
        this.users = users.filter(user =>
          (user.user_name.toLowerCase().includes(searchValueLower)) ||
          (user.user_surname.toLowerCase().includes(searchValueLower))
        );

        // Filtrer les cartes qui correspondent à la valeur de recherche
        this.cards = cards.filter(card =>
          (card.title.toLowerCase().includes(searchValueLower))
        );

      });
    } else {
      // Aucune valeur de recherche, réinitialiser les résultats
      this.hasValue = false;
    }
  }

  /**
   * Navigue vers la page de profil d'un utilisateur spécifié par son identifiant.
   * Actualise la page après la navigation.
   *
   * @param userId L'identifiant de l'utilisateur dont on souhaite afficher le profil.
   */
  goToProfile(userId: number) {
    this.router.navigateByUrl(`/profil/${userId}`, { skipLocationChange: false }).then(() => {
      window.location.reload();
    });
  }

  /**
  * Ouvre une fenêtre modale pour afficher une carte spécifiée par son identifiant.
  *
  * @param cardId L'identifiant de la carte que l'on souhaite afficher.
  */
  goToCard(cardId: number) {
    const modalRef = this.modalService.open(PopupCardComponent);
    modalRef.componentInstance.card = this.cards.find(card => card.id === cardId);
  }

  onSubmit(): void {

  }


  /**
   * Gère l'événement de saisie dans le champ de recherche.
   * Met à jour la valeur de recherche, déclenche la récupération des données correspondantes et effectue les actions associées.
   */
  onSearchInput(): void {
    // Met à jour la valeur de recherche en la convertissant en minuscules
    this.searchValue = this.searchForm.value.searchValue.toLowerCase() ?? '';

    // Effectue la récupération des données correspondantes
    this.fetchData();

    // Affiche ou masque le résultat en fonction de la présence de données
    // console.log(this.hasValue);
  }


}
