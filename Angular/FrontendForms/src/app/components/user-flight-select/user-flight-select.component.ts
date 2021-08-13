import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from 'src/app/services/flights.service';
@Component({
  selector: 'app-user-flight-select',
  templateUrl: './user-flight-select.component.html',
  styleUrls: ['./user-flight-select.component.css']
})
export class UserFlightSelectComponent implements OnInit {

  oneway?:any;
  twoway?:any;
  flag:boolean;
  onewaydata:any;
  twowaydata:any;

  pCount : number;

  OWboolArray : boolean[] = Array().fill(false);
  RTboolArray : boolean[] = Array().fill(false);
  OWbtnTrigger : boolean[] =Array().fill(false);
  RTbtnTrigger : boolean[] =Array().fill(false);
  OWselect : boolean = false;
  RTselect : boolean = false;
  OWprice : number;
  RTprice : number;
  OWflightSelect : any;
  RTflightSelect : any;
  OWflightClass : boolean;
  RTflightClass : boolean;

  constructor(private route : ActivatedRoute, private router : Router) { }



  OWSelect(index : number,obj : any){
    this.OWbtnTrigger.fill(false);
    this.OWboolArray.fill(false);
    this.OWselect = false;
    this.OWboolArray[index] = true;
    this.OWflightSelect = obj;
  }

  RTSelect(index : number,obj : any){
    this.RTbtnTrigger.fill(false);
    this.RTboolArray.fill(false);
    this.RTselect = false;
    this.RTboolArray[index] = true;
    this.RTflightSelect = obj;
  }

  OWpriceSelect(event : any){
    this.OWbtnTrigger.fill(false);
    this.OWbtnTrigger[Number((event.target.id).slice(0,1))] =true;
    if(Number((event.target.id).slice(0,1)) == 0){
      this.OWflightClass = false;
    }
    else{
      this.OWflightClass = true;
    }
    console.log(event.target.value);
    this.OWselect = true;
    this.OWprice = Number(event.target.value)
  }

  RTpriceSelect(event : any){
    this.RTbtnTrigger.fill(false);
    this.RTbtnTrigger[Number((event.target.id).slice(0,1))] =true;
    if(Number((event.target.id).slice(0,1)) == 0){
      this.RTflightClass = false;
    }
    else{
      this.RTflightClass = true;
    }
    this.RTselect = true;
    this.RTprice = Number(event.target.value)
  }

  Continue(){
    console.log(this.OWflightSelect,this.RTflightSelect)
    localStorage.setItem("onewayDetails",JSON.stringify(this.OWflightSelect));
    localStorage.setItem("OWflightType",JSON.stringify(this.OWflightClass));
    localStorage.setItem("OWprice",JSON.stringify(this.OWprice));
    if(this.flag){
      localStorage.setItem("roundtripDetails",JSON.stringify(this.RTflightSelect));
      localStorage.setItem("RTflightType",JSON.stringify(this.RTflightClass));
      localStorage.setItem("RTprice",JSON.stringify(this.RTprice));
    } 
    this.router.navigate(['../','addPassenger'],{relativeTo : this.route})
  }

  ngOnInit(): void {
    this.pCount =Number(localStorage.getItem('passengervalue'))
    this.flag=JSON.parse(localStorage.getItem('flagTripType')!);
    if(this.flag)
    {
      this.oneway =JSON.parse(localStorage.getItem('onewayDetails')!); 
      console.log(this.oneway);

      this.twoway = JSON.parse(localStorage.getItem('roundtripDetails')!);
      console.log(this.twoway);
    }
    else
    {
      this.oneway = JSON.parse(localStorage.getItem('onewayDetails')!); 
      console.log(this.oneway);
    }
  }

}
