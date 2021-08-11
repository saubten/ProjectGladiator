import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(public AC : AppComponent) { }

  ngOnInit(): void {
  }

  onLogin(){
    this.AC.navbarTrigger = false;
  }
}
