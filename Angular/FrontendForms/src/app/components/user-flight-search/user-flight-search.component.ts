import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Flights } from 'src/app/models/flights';
import { FlightService } from 'src/app/services/flights.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-flight-search',
  templateUrl: './user-flight-search.component.html',
  styleUrls: ['./user-flight-search.component.css']
})
export class UserFlightSearchComponent implements OnInit {

  triptype:any=['One Way','Round Trip']
  pattern="^[ a-zA-Z][a-zA-Z ]*$"
  selectedValue: string = '';

  flightsearchform:FormGroup;


  s:string[]=["Mumbai","Chennai","Delhi","Bangalore","Pune","Jammu","Hyderabad"].sort();;
  scopys:string[]=["Mumbai","Chennai","Delhi","Bangalore","Pune","Jammu","Hyderabad"].sort();
  name?:string;
  index?:number;
  DDlbox : FormGroup;
  constructor(private flightservice:FlightService,private http:HttpClient,private route:Router) {    

    this.flightsearchform = new FormGroup({
      tripType : new FormControl('',Validators.required),
      from: new FormControl(null,[Validators.required,Validators.pattern(this.pattern)]),
      to: new FormControl(null,[Validators.required,Validators.pattern(this.pattern)]),
      departureDate: new FormControl(null,Validators.required),
      returnDate: new FormControl(null),
      passengersCount: new FormControl(null) 
    });

  }

  c(){
    console.log(this.flightsearchform.value['from']);
    this.s=["Mumbai","Chennai","Delhi","Bangalore","Pune","Jammu","Hyderabad"].sort();
    this.index=this.s.findIndex(a=>a===this.flightsearchform.value['from'])
    console.log(this.index)
    if(this.index!=-1){
      this.s.splice(this.index,1);

    }
    
    console.log(this.s);
    
  }

  changeTrip(e:any) {
    this.triptype.setValue(e.target.value, {
      onlySelf: true
    })
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

  flag:boolean=false;
  flightsearch:Flights={};

  //VARs for reading data 
  fromLocation?:string;
  toLocation?:string;
  departureDate?:Date;
  returnDate?:Date;

  //VARs for storing data in localStorage 
  onewaydetails:any;
  roundtripdetails?:any;
  

  get f(){
    return this.flightsearchform.controls
  }
  
  getflightSearch()
  {  
    
    //For round trip
    if(this.flightsearchform.value["returnDate"]!=null)
    {
      localStorage.clear();
      this.flag=true;
      localStorage.setItem("flagTripType",JSON.stringify(this.flag));

      //DATA BINDING
      this.fromLocation = this.flightsearchform.value["from"]
      this.toLocation = this.flightsearchform.value["to"]
      this.departureDate = this.flightsearchform.value["departureDate"]
      this.returnDate = this.flightsearchform.value["returnDate"]

      this.flightservice.getFlightDetails(this.fromLocation,this.toLocation,this.departureDate).subscribe((res)=>{    
      this.onewaydetails = res;
      localStorage.setItem("onewayDetails",JSON.stringify(this.onewaydetails));
      console.log(res);

      this.flightservice.getFlightDetails(this.toLocation,this.fromLocation,this.returnDate).subscribe((res)=>{
        this.roundtripdetails = res;
        localStorage.setItem("roundtripDetails",JSON.stringify(this.roundtripdetails));
        console.log(res); 
        localStorage.setItem("passengervalue",JSON.stringify(this.flightsearchform.value['passengersCount']));
        this.route.navigate(['flightSelect'])     
        },
        (err : any) => {
          console.log(err)
        })
      },
      (err : any)=>{
        console.log(err)
      })
    }
    //For one way
    else
    {
      localStorage.clear();

      this.flag=false;
      localStorage.setItem("flagTripType",JSON.stringify(this.flag));

      this.fromLocation=this.flightsearchform.value["from"]
      this.toLocation=this.flightsearchform.value["to"]
      this.departureDate=this.flightsearchform.value["departureDate"]
      
      this.flightservice.getFlightDetails(this.fromLocation,this.toLocation,this.departureDate).subscribe((res)=>{    
      this.onewaydetails=res;
      localStorage.setItem("onewayDetails",JSON.stringify(this.onewaydetails));
      console.log(res);
      localStorage.setItem("passengervalue",JSON.stringify(this.flightsearchform.value['passengersCount']));
      this.route.navigate(['flightSelect'])
      },
      (err : any)=>{
        console.log(err)
      })
    }  
  }



  ngOnInit(){
    localStorage.clear();
    this.pastdatedisable();
  }
}

