using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

#nullable disable

namespace MainWebAPI.Models
{   
    [DataContract]
    public partial class Booking
    {
        public Booking()
        {
            Passegers = new HashSet<Passeger>();
            RoundTrips = new HashSet<RoundTrip>();
        }
        [DataMember]
        public int BookingId { get; set; }
        [DataMember]
        public string FlightNumber { get; set; }
        [DataMember]
        public int TransactionId { get; set; }
        [DataMember]
        public int Passengers { get; set; }
        [DataMember]
        public decimal TicketFare { get; set; }
        [DataMember]
        public bool IsBusiness { get; set; }
        [DataMember]
        public bool IsCancelled { get; set; }
        [DataMember]
        public bool IsReturn { get; set; }

        public virtual Flight FlightNumberNavigation { get; set; }
        public virtual TransactionTb Transaction { get; set; }
        public virtual ICollection<Passeger> Passegers { get; set; }
        public virtual ICollection<RoundTrip> RoundTrips { get; set; }
    }
}
