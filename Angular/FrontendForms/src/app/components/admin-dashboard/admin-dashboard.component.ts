import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  fullname : string;
  constructor() { }

  ngOnInit(): void {
    this.fullname = localStorage.getItem("AdminFullName")!
  }

}
