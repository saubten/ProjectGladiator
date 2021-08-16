using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MainWebAPI.Models;

namespace MainWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PassengerController : ControllerBase
    {
        private readonly AirlineReservationContext db;

        public PassengerController(AirlineReservationContext context)
        {
            db = context;
        }

        #region PassengerAddition
        [HttpPost]
        public IActionResult Passengers([FromBody] List<Passeger> passenger)
        {
            try
            {
                Passeger np = new Passeger();
                foreach (Passeger p in passenger)
                {
                    np = p;
                    db.Passegers.Add(np);
                    db.SaveChanges();
                }
                return Ok("Data Added Successfully");
            }
                catch (Exception e)
                {
                    return BadRequest("Invalid data");
                }   


        }
        #endregion
    }
}
