import { Component, OnInit } from '@angular/core';
import { Card } from 'src/classes/Card';
import { CardService } from '../card.service';
import { Router } from '@angular/router';
import {UserService} from "../user.service";
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  public product: Card;
  // Autres propriétés et méthodes nécessaires

  constructor(private cardService: CardService, private router: Router,private userService : UserService) {
    this.product = new Card(0, '', 0, '', '', 0, 0, 0, 0, new Date(), '');
  }

  ngOnInit() {
    this.userService.checkUserSession() ? '' : this.router.navigateByUrl('');
  }

  onSubmit() {
    console.log('Le formulaire a été soumis.');
    // Validation du formulaire et traitement des données
    if (this.isFormValid()) {
      this.addProduct();
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


  // Autres méthodes et logique de traitement des données

}


