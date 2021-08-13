import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private route : ActivatedRoute,private router : Router) { }

  flowTrigger : string;
  tempReader : any;

  boolUserAdmin : boolean;
  ngOnInit(): void {
    this.tempReader = this.route.snapshot.paramMap.get('id');
    this.flowTrigger = this.tempReader
    console.log(this.flowTrigger)
  }

  onLogin(){
    if(!this.boolUserAdmin){
      this.router.navigate(['/adminDashboard']);
    }
    else{
      if(this.flowTrigger.localeCompare('1') == 0){
        this.router.navigate(['/payment'])
      }
      else{
        this.router.navigate(['userDashboard',this.flowTrigger])
      }
    }
  }

  User(){
    this.boolUserAdmin = true;
  }

  Register(){
    this.router.navigate(['/register']);
  }

  Admin(){
    this.boolUserAdmin = false;
  }
}
