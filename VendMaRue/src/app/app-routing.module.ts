import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InscriptionComponent} from "./inscription/inscription.component";
import {CardsComponent} from "./cards/cards.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {ProfilComponent} from "./profil/profil.component";
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path:'',component:CardsComponent},
  {path:'home', component:CardsComponent},
  {path:'inscription',component:InscriptionComponent},
  {path:'connexion',component:ConnexionComponent},
  {path:'profil/:id',component:ProfilComponent},
  {path:'settings',component:SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
