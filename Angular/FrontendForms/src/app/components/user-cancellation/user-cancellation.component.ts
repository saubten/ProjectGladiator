import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-cancellation',
  templateUrl: './user-cancellation.component.html',
  styleUrls: ['./user-cancellation.component.css']
})
export class UserCancellationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    BookingID : new FormControl('',[Validators.required]),
  });
 

  get f(){
    return this.form.controls;
  }

  enter(f : FormGroup){
    console.log(f.value['BookingID'])
  }
}
