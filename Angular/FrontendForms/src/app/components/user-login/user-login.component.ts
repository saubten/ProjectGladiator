import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  pattern="^[ a-zA-Z][a-zA-Z ]*$";
  flightloginform:FormGroup;
  flowTrigger : string;
  tempReader : any;

  constructor(private route : ActivatedRoute,private router : Router) { 
    this.flightloginform=new FormGroup({
    userType : new FormControl('',Validators.required),
    username:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])

  },
  )}
 
  get f(){
    return this.flightloginform.controls
  }

  boolUserAdmin : boolean;
  ngOnInit(): void {
    
    this.tempReader = this.route.snapshot.paramMap.get('id');
    this.flowTrigger = this.tempReader
    console.log(this.f.userType.value)
  }

  onLogin(){
    if(this.f.userType.value == 1){
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
  

  onSubmit1(){
    console.warn(this.flightloginform.value);
    alert("you have successfully regiistered");
    alert("thank you for registering")
  }
}
