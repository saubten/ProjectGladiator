import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  fullname : string;
  constructor(private router : Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('LoginCheckCode') != "Admin"){
      this.router.navigate(['/loginPage/flightSearch'])
    }
    this.fullname = sessionStorage.getItem("AdminFullName")!
  }

  Logout(){
    sessionStorage.clear()
    this.router.navigate([""])
  }

}
