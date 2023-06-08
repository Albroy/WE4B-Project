import { Component,Input,OnInit } from '@angular/core';
import {User} from "../../classes/User";
import {ProfilService} from "../profil.service";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit{
  @Input() user !: User;
  user_idx :number;
  error : boolean = false;

  constructor(private activatedroute : ActivatedRoute, private service : ProfilService) {
    this.user_idx = parseInt(this.activatedroute.snapshot.paramMap.get('id') || '0');

    if(service.getUserById(this.user_idx) !=  undefined){
      this.user = service.getUserById(this.user_idx);
    }else{
      this.error = true;
    }
    console.log(this.user)
  }
  ngOnInit() {
  }
}
