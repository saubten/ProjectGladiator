import { Time } from "@angular/common";

export class Flights
{
    RegistrationNumber?:string;
    FlightNumber?:string;
    FromLocation?:string;
    ToLocation?:string;
    DepartureDate?:Date;
    DepartureTime?:Time;
    ArrivalDate?:Date;
    ArrivalTime?:Time;
    EconomyPrice?:number;
    BusinessPrice?:number;
    AvailableEcononmySeats?:number;
    AvailableBusinessSeats?:number;
    isCancelled?:BinaryType;

}