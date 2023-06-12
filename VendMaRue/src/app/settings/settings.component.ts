import { Component, OnInit,Input } from '@angular/core';
import { User } from "../../classes/User";
import { UserService } from '../user.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  @Input() user !: User;
  userString: string|null = sessionStorage.getItem('user');
  constructor(private userService: UserService, private datePipe: DatePipe) {
    console.log(sessionStorage.getItem('user'));
    
    if (this.userString) {//si on est connecté
      this.user = JSON.parse(this.userString);
      console.log(this.user);
    }else{
      this.user = new User(0,"","","","",0,new Date(),"","");
    }
 


  }
  ngOnInit() {
  }


}
