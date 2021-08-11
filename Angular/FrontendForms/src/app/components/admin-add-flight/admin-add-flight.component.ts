import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-add-flight',
  templateUrl: './admin-add-flight.component.html',
  styleUrls: ['./admin-add-flight.component.css']
})
export class AdminAddFlightComponent implements OnInit {

  constructor() { }

  AirTickets:FormGroup;
  title = 'PROJECTGLAD';

  ngOnInit(){
    this.AirTickets=new FormGroup({
    FlightNo :new FormControl(null,Validators.required),
    from :new FormControl('',Validators.required),
    to: new FormControl('',Validators.required),
    EconomyPrice :new FormControl('',Validators.required),
    BussPrice :new FormControl('',Validators.required),
    AvlEcoseat : new FormControl('',Validators.required),
    AvlBussseat: new FormControl('',Validators.required),
    DepDate:new FormControl(''),
    DepTime :new FormControl(''),
    ArrDate: new FormControl(''),
    ArrTime: new FormControl(''),
  }

  );
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

}
