import { Component, OnInit } from '@angular/core';
import { Card } from 'src/classes/Card';
import { CardService } from '../card.service';
import { Router } from '@angular/router';
import {UserService} from "../user.service";
// import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  public product: Card;
  // Autres propriétés et méthodes nécessaires
  cardId: string | null = null;
  public cardToEdit: boolean = false;



  constructor(private route: ActivatedRoute,private cardService: CardService, private router: Router,private userService : UserService) {
    this.product = new Card(0, '', 0, '', '', 0, 0, 0, 0, new Date(), '');
  }

  ngOnInit() {
    this.userService.checkUserSession() ? '' : this.router.navigateByUrl('');
    this.userService.checkUserSession() ? '' : this.router.navigateByUrl('');
    this.cardId = this.route.snapshot.paramMap.get('id');
    if (this.cardId) {
      this.cardService.getCardById(this.cardId).subscribe(card => {
        this.product = card; // Pré-remplir le formulaire avec les valeurs de l'annonce à modifier
      });
    }
  }

  onSubmit() {
    console.log('Le formulaire a été soumis.');
    // Validation du formulaire et traitement des données
    if (this.isFormValid()) {

      if (this.cardId) {
        this.cardService.updateCard(this.cardId, this.product).subscribe(
          (data: Card) => {
            console.log('Annonce mise à jour :', data);
            this.router.navigateByUrl('/mes-annonces'); // Rediriger vers la page appropriée après la mise à jour
          },
          (error: any) => {
            console.error("Erreur lors de la mise à jour de l'annonce :", error);
          }
        );
      } else {
        this.addProduct();
      }
      this.resetForm(); // Réinitialiser le formulaire

    } else {
      // Gestion des erreurs ou des conditions invalides
    }
  }

  resetForm() {
    const form = document.getElementById('productForm') as HTMLFormElement;
    form.reset();
  }



  addProduct() {
    const fileName = this.getFileNameFromPath(this.product.photo);

    // Ajouter le préfixe "../assets/" au nom du fichier
    this.product.photo = "../assets/" + fileName;
    this.product.userid= this.userService.getUserId()

    this.cardService.addCard(this.product).subscribe(
      (data: Card) => {
        console.log('Nouveau produit ajouté :', data);
        this.router.navigateByUrl(''); // Rediriger vers la page d'accueil ou une autre page appropriée
      },
      error => {
        console.error("Erreur lors de l'ajout du produit :", error);
      }
    );
  }

  isFormValid(): boolean {
    const { title, brand, price, quantity, date, loc } = this.product;

    // Vérification des champs requis
    if (!title || !brand || !price || !quantity || !date || !loc) {
      return false;
    }

    return true;
  }

  getFileNameFromPath(path: string | undefined): string {
    if (!path) {
      return '';
    }

    return path.split('\\').pop() || '';
  }



}


