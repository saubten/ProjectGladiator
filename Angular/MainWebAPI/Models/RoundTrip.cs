using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

#nullable disable

namespace MainWebAPI.Models
{
    [DataContract]
    public partial class RoundTrip
    {
        [DataMember]
        public int RoundTripId { get; set; }
        [DataMember]
        public int BookingId { get; set; }
        [DataMember]
        public string FlightNumber { get; set; }
        [DataMember]
        public decimal TicketFare { get; set; }
        [DataMember]
        public bool IsCancelled { get; set; }
        [DataMember]
        public bool IsBusiness { get; set; }

        public virtual Booking Booking { get; set; }
        public virtual Flight FlightNumberNavigation { get; set; }
    }
}
