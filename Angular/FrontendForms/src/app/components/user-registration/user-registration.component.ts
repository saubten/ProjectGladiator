import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  [x: string]: any;
  UserLoginForm: any;
  submitted?:boolean;


  constructor(){

  }
  ngOnInit():void {
    this.submitted=false;
    this.UserLoginForm= new FormGroup({
      Title:new FormControl(''),
      FirstName: new FormControl('',[Validators.required]),        //this means this input compulsorily requires value
      LastName: new FormControl('',[Validators.required]),
      email:new FormControl(' ',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required]),
      username:new FormControl ('',[Validators.minLength(6), Validators.maxLength(20),Validators.required]),
      Confirmpassword:new FormControl('',[Validators.required]),
      DOB: new FormControl(''),
      phoneNo:new FormControl ('')
    },
    {
      validators: this.checkPasswords
    }
    );

  }
  
  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = this.UserLoginForm.value['password'].value;
    let confirmPass = this.UserLoginForm.value['Confirmpassword'].value;
    return pass === confirmPass ? null : { notSame: true }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.UserLoginForm.controls;
  }
  


  
  onSubmit(): void {
    this.submitted = true;

    if (this.UserLoginForm.invalid) {
      return;
    }

    console.log(JSON.stringify(this.UserLoginForm.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.UserLoginForm.reset();
  }
  //to view the details using formcontrols--this.userLoginForm.controls['firstname'].value;
  //or this.userLoginForm.get('firstname').value;


}
