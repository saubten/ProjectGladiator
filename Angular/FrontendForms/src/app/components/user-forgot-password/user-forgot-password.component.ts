import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-forgot-password',
  templateUrl: './user-forgot-password.component.html',
  styleUrls: ['./user-forgot-password.component.css']
})
export class UserForgotPasswordComponent implements OnInit {

  forgotpasswordform:FormGroup;
  otpform : FormGroup;
  regId : number;
  email : string;
  newPassword : string;
  otp : string;

  temp : any; 

  patternpassword:string="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}"
  constructor(private userService : UserServices, private router : Router,private route : ActivatedRoute) { 
    this.forgotpasswordform=new FormGroup({
      userId:new FormControl('',[Validators.required]),
      useremail:new FormControl('',[Validators.required,Validators.email]),
      fpassword:new FormControl('',[Validators.required,Validators.minLength(6), Validators.maxLength(20),Validators.pattern(this.patternpassword)]),
    },
  )
    this.otpform=new FormGroup({
      fotp:new FormControl('',[Validators.required])
    },
  )
   }

  ngOnInit(): void {
    this.temp = this.route.snapshot.paramMap.get('id')
  }

  get forgotf(){
    return this.forgotpasswordform.controls
  }

  get otpf(){
    return this.otpform.controls
  }

  GetOTP(){
    this.regId = this.forgotf.userId.value;
    this.email = this.forgotf.useremail.value;
    this.userService.sendOTP(this.regId,this.email).subscribe(data => {
      if(data == "Invalid"){
        alert("Wrong Registration Number")
      }
      else{
        this.otp = data.toString();
        console.log(this.otp);
      }
    })
  }

  VerifyOTP(){
    if(this.otp == this.otpf.fotp.value){
      this.newPassword = this.forgotf.fpassword.value;
      this.userService.updatePassword(this.newPassword,this.email).subscribe(data => {
        if(data == "Invalid"){
          alert("Something went wrong try again")
        }
        else{
          alert(data);
        }
      })
      console.log("wallah habibi")
      this.router.navigate(['/loginPage',this.temp])   
    }
    else{
      alert("Incorrect OTP")
      this.router.navigate(['/forgot',this.temp])
    }
  }
}
