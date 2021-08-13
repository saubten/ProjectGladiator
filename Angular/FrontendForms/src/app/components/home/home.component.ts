import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  paramURL? : string;
  constructor(private route : ActivatedRoute,private router : Router) { }

  ngOnInit(): void {
    console.log(this.route.firstChild?.routeConfig?.path)
  }

  SignInRegister(){
    this.paramURL = this.route.firstChild?.routeConfig?.path;
    this.router.navigate(['/loginPage',this.paramURL])
  }
}
