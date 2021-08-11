using System;
using System.Collections.Generic;

#nullable disable

namespace MainWebAPI.Models
{
    public partial class Passeger
    {
        public int PassengerId { get; set; }
        public int BookingId { get; set; }
        public int OneWaySeatId { get; set; }
        public int? RoundTripSeatId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string PhoneNumber { get; set; }

        public virtual Booking Booking { get; set; }
        public virtual FlightSeat OneWaySeat { get; set; }
        public virtual FlightSeat RoundTripSeat { get; set; }
    }
}
