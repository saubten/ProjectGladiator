using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MainWebAPI.ViewModel
{
    public class AddTransaction
    {
        public int UserId { get; set; }
        public decimal TransactionAmount { get; set; }
    }
}
