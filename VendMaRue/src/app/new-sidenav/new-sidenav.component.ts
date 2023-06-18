import { Component, OnInit,Input} from '@angular/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-new-sidenav',
  templateUrl: './new-sidenav.component.html',
  styleUrls: ['./new-sidenav.component.scss']
})
export class NewSidenavComponent implements OnInit{
    @Input() sideNavStatus : boolean=false;
    list :any []=[]
    array : number[]=[0,1,2,3]
    //faire push for

    constructor(public userservice : UserService) {}

    ngOnInit() {
      this.list= [
        {
          name:'Home',
          icon:'fa-solid fa-house',
          route:'/home'
        },
        {
          name:'Conversation',
          icon:'fa-solid fa-comment',
          route:'/chats'
        },
        {
          name:'Products',
          icon:'fa-solid fa-box',
          route:''
        },
        {
          name:'Orders',
          icon:'fa-solid fa-shopping-bag',
          route:''
        },
        {
          name: 'Profil',
          icon: 'fa-solid fa-user',
          route:'/profil/:'
        }
      ];

    }

}
