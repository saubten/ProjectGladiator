using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

#nullable disable

namespace MainWebAPI.Models
{
    [DataContract]
    public partial class Passeger
    {
        [DataMember]
        public int PassengerId { get; set; }
        [DataMember]
        public int BookingId { get; set; }
        [DataMember]
        public int OneWaySeatId { get; set; }
        [DataMember]
        public int? RoundTripSeatId { get; set; }
        [DataMember]
        public string FirstName { get; set; }
        [DataMember]
        public string LastName { get; set; }
        [DataMember]
        public int Age { get; set; }
        [DataMember]
        public string PhoneNumber { get; set; }

        public virtual Booking Booking { get; set; }
        public virtual FlightSeat OneWaySeat { get; set; }
        public virtual FlightSeat RoundTripSeat { get; set; }
    }
}
