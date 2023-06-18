import { Component,Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Card } from '../../classes/Card';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupCardComponent } from '../popup-card/popup-card.component';
import {User} from "../../classes/User";
import {ChatService} from "../chat.service";
import {Chat} from "../../classes/Chat";
import {Router} from "@angular/router";

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

  constructor(private modalService: NgbModal, private service : ChatService, private router : Router) {
    if (this.userString) { // Si on est connecté
      this.user = JSON.parse(this.userString);
    } else {
      this.user = new User(0, "", "", "", "", 0, new Date(), "", "");
    }
  }

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.service.getData().toPromise();
      this.conversationList = data ? data : [];
    } catch (error) {
      console.log(error);
    }
  }


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
/*  newConversation(id:number){

    // Si l'utilisateur est connecté
    if(this.user.id != 0){

      // On récupère la liste des conversations crées
      this.service.getData().subscribe(
        data => {
          this.conversationList = data

          const search = this.conversationList.find(u=>u.userid_client=== this.user.id && u.userid_vendor===this.card.userid)
          /!*Si la conversation existe dans la bdd, id de la conversation id du vendeur*!/
          if(search){
            console.log(search)

            this.conversationID = search.id

            /!*on n'a pas besoin de créer de nouvelle conversation dans la bdd*!/
          }else{
            console.log("conversation n'existe pas")
            /!*creation de la nouvelle conversation*!/
            this.service.addChat(new Chat(0,this.card.title,this.card.userid,this.user.id,"16/06.2020")).subscribe(
              data => {
                console.log(data)
              }
            )
            this.service.getData().subscribe(
              data => {
                this.conversationList = data
            const search = this.conversationList.find(u=>u.userid_client=== this.user.id && u.userid_vendor===this.card.userid)
            this.conversationID = search?search.id:0;
              })
          }
        }
      )

    }else{
      /!*L'utilisateur n'est pas connecté*!/
      console.log("user not connected")
    }


  }*/

  async newConversation(id: number) {
    if (this.user.id !== 0) {
      try {
        const data = await this.service.getData().toPromise();
        this.conversationList = data?data:[];

        const search = this.conversationList.find(u => u.userid_client === this.user.id && u.userid_vendor === this.card.userid);

        if (search) {
          console.log(search);
          this.conversationID = search.id;
        } else {
          console.log("Conversation does not exist");

          const newChat = new Chat(0, this.card.title, this.card.userid, this.user.id, "16/06/2020");
          const createdChat = await this.service.addChat(newChat).toPromise();

          console.log(createdChat);

          const updatedData = await this.service.getData().toPromise();
          this.conversationList = updatedData?updatedData:[]

          const updatedSearch = this.conversationList.find(u => u.userid_client === this.user.id && u.userid_vendor === this.card.userid);
          this.conversationID = updatedSearch ? updatedSearch.id : 0;
        }
      } catch (error) {
        console.log(error);
      }
      const queryParams = {
        info: `/chat/:${this.conversationID}`,
      };
      this.router.navigate(['/redirect'], { queryParams });

    } else {
      console.log("User not connected");
    }

  }


}
