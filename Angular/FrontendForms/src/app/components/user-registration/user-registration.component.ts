import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Users } from 'src/app/models/users';
import { UserServices } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  userRegistrationForm:FormGroup;
  pattern="^[ a-zA-Z][a-zA-Z ]*$";
  pattern1:string="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}"
  idToSend : number;
  constructor(private userServices:UserServices) {

    this.userRegistrationForm= new FormGroup({
      title:new FormControl(''),
      firstName:new FormControl('',[Validators.required,Validators.pattern(this.pattern)]),
      lastName:new FormControl('',[Validators.required,Validators.pattern(this.pattern)]),
      email:new FormControl('',[Validators.required,Validators.email]),
     
      password:new FormControl('',[Validators.required,Validators.minLength(6), Validators.maxLength(20),Validators.pattern(this.pattern1)]),
      confirmpassword:new FormControl('',Validators.required),
      DOB:new FormControl('',Validators.required),
      phoneNumber:new FormControl('',[Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.required]),
      walletAmount:new FormControl('',[Validators.required])
      
    });
   }

  onSubmit1(){
    alert("You have been successfully registered!");
    alert("Thank You");
    this.addUser();
  }
  maxdate:any;
  pastdatedisable(){
    var date = new Date();
    var todayDate:any = date.getDate();
    var month:any = date.getMonth()+1;
    var year = date.getFullYear();

    if(todayDate < 10){
      todayDate = '0' + todayDate;
    }

    if(month<10){
      month = '0' + month;
    }
  console.log(month);
  console.log(year);

  this.maxdate = year + "-" + month + "-" +todayDate;    

  }
  OnReset(){
    this.userRegistrationForm.reset();
  }
  




  ngOnInit() {
    this.pastdatedisable();
  }


  //call the getdept from departmentservice
  Users1?:Users;
  UserForId : any;

  errmsg?:string;
  fetchUserID()
  {
    this.userServices.getUser().subscribe((data : any)=>
    {
      this.UserForId = data;
      this.idToSend = this.UserForId.userID; 
    },
    (err : any)=>
    {
      return this.errmsg=err.error.Message; 
    }
    );
  }

  sendRegistrationId(email : string){
    this.userServices.sendRegistrationNumber(email).subscribe((data)=>{
      console.log(data);
    });
  }

  message?:any;

  User1:Users={};
  addUser()
  {
    
    this.User1.emailId=this.userRegistrationForm.get('email')?.value;
    this.User1.title=this.userRegistrationForm.get('title')?.value;
    this.User1.firstName=this.userRegistrationForm.get('firstName')?.value;
    this.User1.lastName=this.userRegistrationForm.get('lastName')?.value;
    this.User1.password=this.userRegistrationForm.get('password')?.value;
    this.User1.dob=this.userRegistrationForm.get('DOB')?.value;
    this.User1.phoneNumber=this.userRegistrationForm.get('phoneNumber')?.value;
    this.User1.walletAmount=this.userRegistrationForm.get('walletAmount')?.value;
    
  
    this.userServices.insertUser(this.User1).subscribe((data : any)=>
    {this.message=data;
     this.sendRegistrationId(this.User1.emailId!); 
    });
    
//to avoid reloading to see the inserted record in table
    
    console.log(this.User1);

  }

  confirmPasswordValidator():boolean{
    if(this.userRegistrationForm.get('password')?.value==this.userRegistrationForm.get('confirmpassword')?.value && this.userRegistrationForm.get('confirmpassword')?.dirty){
      return false
    }
    else
    {
      return true
    }
  }

}
