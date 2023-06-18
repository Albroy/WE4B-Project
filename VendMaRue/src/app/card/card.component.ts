import { Component,Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Card } from '../../classes/Card';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupCardComponent } from '../popup-card/popup-card.component';
import {User} from "../../classes/User";
import {ChatService} from "../chat.service";
import {Chat} from "../../classes/Chat";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card!: Card;
  @Input() showEditButton: boolean = false; // Par défaut, le bouton "Modifier" est masqué
  @Output() editCardEvent = new EventEmitter<Card>();
  conversationList : Chat[] = []
  conversationID : number = 0
  userString: string | null = sessionStorage.getItem('user');
  user : any

  constructor(private modalService: NgbModal, private service : ChatService) {
    if (this.userString) { // Si on est connecté
      this.user = JSON.parse(this.userString);
    } else {
      this.user = new User(0, "", "", "", "", 0, new Date(), "", "");
    }
  }

  ngOnInit(): void {}

  openModal() {
    const modalRef = this.modalService.open(PopupCardComponent);
    modalRef.componentInstance.card = this.card;
    // console.log(this.card.id);
  }

  editCard() {
    this.editCardEvent.emit(this.card);
  }

  // Ouverture de la conversation déclenché par "contacter"
  // On récupère id du post
  newConversation(id:number){

    // Si l'utilisateur est connecté
    if(this.user.id != 0){

      // On récupère la liste des conversations crées
      this.service.getData().subscribe(
        data => {
          this.conversationList = data

          /*Si la conversation existe dans la bdd, id de la conversation id du vendeur*/
          if(this.conversationList.find(u=>u.userid_client=== this.user.id && u.userid_vendor===this.card.userid)){
            console.log(this.conversationList.find(u=>u.userid_client=== this.user.id && u.userid_vendor===this.card.userid))
/*
            this.conversationID = this.conversationList.find(u=>u.userid_client=== this.user.id && u.userid_vendor===this.card.userid).id
*/
            /*on n'a pas besoin de créer de nouvelle conversation dans la bdd*/
          }else{
            console.log("conversation n'existe pas")
            /*creation de la nouvelle conversation*/
            this.service.addChat(new Chat(0,this.card.title,this.card.userid,this.user.id,"16/06.2020")).subscribe(
              data => {
                console.log(data)
              }
            )
/*
            this.conversationID = this.conversationList.find(u=>u.userid_client=== this.user.id && u.userid_vendor===this.card.userid).id
*/
          }
        }
      )

    }else{
      /*L'utilisateur n'est pas connecté*/
      console.log("user not connected")
    }


  }

}
