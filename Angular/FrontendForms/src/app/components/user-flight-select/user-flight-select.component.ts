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
  flag:boolean=false;
  onewaydata:any;
  twowaydata:any;
  selectedEntry:any;
  selectedEntryReturn:any;
  selectedData:any; 
  selectedDataReturn:any;

  constructor() { }

 onSelectionChange(selFlight:any) {
  
    this.selectedEntry = selFlight;
    console.log(this.selectedEntry);
    localStorage.setItem("onewayDetails",JSON.stringify(this.selectedEntry)); 
  }
       
  onSelectionChangeReturn(selFlight:any) {

    this.selectedEntryReturn = selFlight;
    console.log(this.selectedEntryReturn);
    localStorage.setItem("roundtripDetails",JSON.stringify(this.selectedEntryReturn));

  }


  x?:string
  clsName(i:number){
    this.x=i+" "
    return (this.x);
  }

  y?:string
  clsNameReturn(i:number){
    this.y= i + 10 + " "
    return (this.y);
  }



  ngOnInit(): void {
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
