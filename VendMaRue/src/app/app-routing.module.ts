import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InscriptionComponent} from "./inscription/inscription.component";
import {CardsComponent} from "./cards/cards.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {ProfilComponent} from "./profil/profil.component";
import {CreateProductComponent} from "./create-product/create-product.component";
import {MesAnnoncesComponent} from "./mes-annonces/mes-annonces.component";
import { SettingsComponent } from './settings/settings.component';
import { AnnoncesFiltreComponent } from './annonces-filtre/annonces-filtre.component';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  {path:'',component:CardsComponent},
  {path:'home', component:CardsComponent},
  {path:'inscription',component:InscriptionComponent},
  {path:'connexion',component:ConnexionComponent},
  {path:'profil/:id',component:ProfilComponent},
  {path:'create-product',component:CreateProductComponent},
  {path:'mes-annonces',component:MesAnnoncesComponent},
  {path:'settings',component:SettingsComponent},
  { path: 'create-product/:id', component: CreateProductComponent },
  {path : 'annonces-filtre', component: AnnoncesFiltreComponent},
  {path : 'redirect',component:RedirectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
