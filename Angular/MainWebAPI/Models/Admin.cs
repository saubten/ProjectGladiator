using System;
using System.Collections.Generic;

#nullable disable

namespace MainWebAPI.Models
{
    public partial class Admin
    {
        public string AdminId { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
