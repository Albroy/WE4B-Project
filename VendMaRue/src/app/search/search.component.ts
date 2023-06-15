import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import { SearchService } from '../search.service';
import { User } from 'src/classes/User';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchValue: string = "";
  users: User[] = [];
  searchForm: FormGroup = this.fb.nonNullable.group({
    searchValue: '',
  });
  hasValue: boolean = false;
  constructor(private searchService: SearchService, private fb: FormBuilder,private router:Router) { }

  ngOnInit(): void {
  }

  fetchUserData() {
    if (this.searchValue.length > 0) {
      this.hasValue=true;
      this.searchService.getUser(this.searchValue).subscribe(users => {
        const searchValueLower = this.searchValue.toLowerCase();
        this.users = users.filter(user => 
          (user.user_name.toLowerCase().includes(searchValueLower)) ||
          (user.user_surname.toLowerCase().includes(searchValueLower))
        );
                console.log(this.users);
      });
    }else{
      this.hasValue=false;
    }

  }
  goToProfile(userId: number) {
    this.router.navigateByUrl(`/profil/${userId}`, { skipLocationChange: false }).then(() => {
      window.location.reload();
    });
  }
  
  onSubmit(): void {

  }
  onSearchInput(): void {
    this.searchValue = this.searchForm.value.searchValue.toLowerCase() ?? '';
    this.fetchUserData();
    console.log(this.hasValue)
  }

}
