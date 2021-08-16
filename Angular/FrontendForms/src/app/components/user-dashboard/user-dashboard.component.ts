import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  fullname : string;

  constructor(private router : Router) {

   }

  ngOnInit(): void {

    this.fullname = sessionStorage.getItem('UserFullName')!
  }

  Logout(){
    sessionStorage.clear()
    this.router.navigate([""])
  }

}
