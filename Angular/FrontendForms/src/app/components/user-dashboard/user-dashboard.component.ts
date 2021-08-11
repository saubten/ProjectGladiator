import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private AppCompObj : AppComponent) {
    this.AppCompObj.navbarTrigger = false;
   }

  ngOnInit(): void {
  }

}
