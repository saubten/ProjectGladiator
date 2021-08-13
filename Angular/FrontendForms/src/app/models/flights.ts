import { Time } from "@angular/common";

export class Flights
{
    registrationNumber?:string;
    flightNumber?:string;
    fromLocation?:string;
    toLocation?:string;
    departureDate?:Date;
    departureTime?:Time;
    arrivalDate?:Date;
    arrivalTime?:Time;
    economyPrice?:number;
    businessPrice?:number;
    availableEconomySeats?:number;
    availableBusinessSeats?:number;
    isCancelled?:BinaryType;

}