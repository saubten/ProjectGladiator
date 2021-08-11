using System;
using System.Collections.Generic;

#nullable disable

namespace MainWebAPI.Models
{
    public partial class TransactionTb
    {
        public TransactionTb()
        {
            Bookings = new HashSet<Booking>();
        }

        public int TransactionId { get; set; }
        public int UserId { get; set; }
        public decimal TransactionAmount { get; set; }
        public DateTime DateOfTransaction { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<Booking> Bookings { get; set; }
    }
}
