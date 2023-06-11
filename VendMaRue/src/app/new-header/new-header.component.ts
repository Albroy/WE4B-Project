import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-new-header',
  templateUrl: './new-header.component.html',
  styleUrls: ['./new-header.component.scss']
})
export class NewHeaderComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter<boolean>();
  menuStatus: boolean = false;
  isLoggedIn: boolean;

  constructor(private userService: UserService) {
    this.isLoggedIn = this.userService.checkUserSession();
  }
  ngOnInit() {
  }
  getUserService() {return this.userService;}
  SideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggle.emit(this.menuStatus);
  }



}
