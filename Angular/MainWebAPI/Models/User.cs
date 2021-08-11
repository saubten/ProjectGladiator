using System;
using System.Collections.Generic;

#nullable disable

namespace MainWebAPI.Models
{
    public partial class User
    {
        public User()
        {
            TransactionTbs = new HashSet<TransactionTb>();
        }

        public int UserId { get; set; }
        public string EmailId { get; set; }
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public DateTime Dob { get; set; }
        public string PhoneNumber { get; set; }
        public decimal WalletAmount { get; set; }

        public virtual ICollection<TransactionTb> TransactionTbs { get; set; }
    }
}
