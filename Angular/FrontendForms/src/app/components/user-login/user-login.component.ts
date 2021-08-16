import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Admins } from 'src/app/models/admins';
import { Users } from 'src/app/models/users';
import { AdminService } from 'src/app/services/admin.service';
import { UserServices } from 'src/app/services/user.service';
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
  user : Users;
  admin : Admins;
  err : string

  

  
  constructor(private route : ActivatedRoute,private router : Router, private userService : UserServices ,private adminService : AdminService) { 
    this.flightloginform=new FormGroup({
    userType : new FormControl('',Validators.required),
    username:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])

  },
  )
  }
 
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
      this.adminService.adminVerification(this.f.username.value, this.f.password.value).subscribe(
        data => {
          this.admin = data as Admins;
          console.log(data);
            sessionStorage.clear();
            sessionStorage.setItem('LoginCheckCode', 'Admin');
            sessionStorage.setItem('EmailId', this.admin.adminId!);
            sessionStorage.setItem('AdminFullName',(this.admin.firstName+" "+this.admin.lastName))
            this.router.navigate(['/adminDashboard']);
        },
        err => {
          if(err.error == "Invalid"){
            this.err = "Invalid username or password!!";
            console.log(this.err)
          }
        }
      )
    }
    else{
      this.userService.userVerification(this.f.username.value, this.f.password.value).subscribe(
        data => {
          this.user = data as Users;
          console.log(data);
            sessionStorage.clear();
            sessionStorage.setItem('LoginCheckCode', 'User');
            sessionStorage.setItem('EmailId', this.user.emailId!);
            sessionStorage.setItem('UserFullName',this.user.firstName! +" "+this.user.lastName!)
            if(this.flowTrigger.localeCompare('1') == 0){
              this.router.navigate(['/payment'])
            }
            else{
              this.router.navigate(['userDashboard',this.flowTrigger])
            }
        },
        err => {
          if(err.error == "Invalid"){
            this.err = "Invalid username or password!!";
            console.log(this.err)
          }
        }
      )
      
    }
  }

  Register(){
    this.router.navigate(['/register']);
  }

  Forgot(){
    this.router.navigate(['/forgot',this.flowTrigger]);
  }

  onSubmit1(){
    console.warn(this.flightloginform.value);
  }

}
