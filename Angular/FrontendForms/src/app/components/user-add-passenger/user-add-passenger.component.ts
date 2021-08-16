import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Passenger } from 'src/app/models/passengers';


@Component({
  selector: 'app-user-add-passenger',
  templateUrl: './user-add-passenger.component.html',
  styleUrls: ['./user-add-passenger.component.css']
})

export class UserAddPassengerComponent implements OnInit {

  showPassengerForms: boolean;
  passenger : Passenger = {};
  passengerList : Passenger[] = [];
  editPassenger : Passenger ={};
  ind : number
  count : number;
  
  phonePattern = "^[0-9]{10}$";

  form = new FormGroup({
    passFirstName : new FormControl('',[Validators.required]),
    passLastName : new FormControl('',[Validators.required]),
    passAge : new FormControl('',[Validators.required]),
    passPhone : new FormControl('',[Validators.required,Validators.pattern(this.phonePattern)]), 
  })

  
  constructor(private route : ActivatedRoute, private router : Router) {
    this.showPassengerForms = false;
    this.count = Number(localStorage.getItem('passengervalue'));
  }

  ngOnInit(): void {
    if(this.route.parent?.routeConfig?.path == "userDashboard"){
      if(sessionStorage.getItem('LoginCheckCode') != "User"){
        this.router.navigate(['/loginPage/flightSearch'])
      }
    } 
  }

  add(objFormGroup : FormGroup){
    this.passenger.passFirstName = objFormGroup.value['passFirstName'].trim();
    this.passenger.passLastName = objFormGroup.value['passLastName'].trim();
    this.passenger.passAge = objFormGroup.value['passAge'];
    this.passenger.passPhone = objFormGroup.value['passPhone'].trim();
    console.log(this.passenger)
    this.passengerList.push(this.passenger)
    console.log(this.passengerList)
    this.passenger = {}
    this.count = this.count-1;
    this.form.reset();
  }

  get f(){
    return this.form.controls;
  }
   
  onDone(){
    localStorage.setItem('passengerList',JSON.stringify(this.passengerList));
    this.router.navigate(['../','seatSelection'],{relativeTo : this.route})
  }

  edit(index : number){
    this.editPassenger = this.passengerList[index];
    console.log(this.editPassenger)
  }

  onSubmitTemplateBased(){
    this.passengerList[this.ind] = this.editPassenger;
  }
}
