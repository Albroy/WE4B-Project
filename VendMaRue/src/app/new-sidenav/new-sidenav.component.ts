import { Component, OnInit,Input} from '@angular/core';

@Component({
  selector: 'app-new-sidenav',
  templateUrl: './new-sidenav.component.html',
  styleUrls: ['./new-sidenav.component.scss']
})
export class NewSidenavComponent implements OnInit{
    @Input() sideNavStatus : boolean=false;

    list= [
      {
        number:'1',
        name:'Home',
        icon:'fa-solid fa-house',
      },
      {
        number:'2',
        name:'Analytics',
        icon:'fa-solid fa-chart-line',
      },
      {
        number:'3',
        name:'Products',
        icon:'fa-solid fa-box',
      },
      {
        number:'4',
        name:'Orders',
        icon:'fa-solid fa-shopping-bag',
      },
      {
        number: '5',
        name: 'Customers',
        icon: 'fa-solid fa-user',
      }
    ];

    constructor() { }

    ngOnInit() {
    }

}
