using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

#nullable disable

namespace MainWebAPI.Models
{   
    [DataContract]
    public partial class TransactionTb
    {
        public TransactionTb()
        {
            Bookings = new HashSet<Booking>();
        }

        [DataMember]
        public int TransactionId { get; set; }
        [DataMember]
        public int UserId { get; set; }
        [DataMember]
        public decimal TransactionAmount { get; set; }
        [DataMember]
        public DateTime DateOfTransaction { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<Booking> Bookings { get; set; }
    }
}
