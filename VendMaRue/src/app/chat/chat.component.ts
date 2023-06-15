import {Component, OnInit} from '@angular/core';
import {ChatService} from "../chat.service";
import {Chat} from "../../classes/Chat";
import {User} from "../../classes/User"

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  chatArray : Chat[]=[]
  vendor : User |any
  name : string = ""

  //Session
  /*user: User | any ;
  userString: string | null = sessionStorage.getItem('user');*/

  constructor(private chatservice:ChatService) {
    this.chatservice.getData().subscribe(
      data => {
        this.chatArray = data
      }
    )
    /*if (this.userString) { // Si on est connecté
      this.user = JSON.parse(this.userString);
      // console.log(this.user);
    } else {
      console.log("pas de connexion")
      this.user.id = null
    }*/
  }
  ngOnInit() {
  }

  getName(id:number) : string{
    this.chatservice.getUserList().subscribe(
      data => {
        const array = data
        if(array.find((u) => u.id === id)){
          this.vendor = array.find((u) => u.id === id);
          this.name = this.vendor.user_name;
        }
      },
      error => {
        console.error("error");
      }
    );
    return this.name
  }
}
