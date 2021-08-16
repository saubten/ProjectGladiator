using MainWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MainWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatController : ControllerBase
    {

        private readonly AirlineReservationContext db;

        public SeatController(AirlineReservationContext context)
        {
            db = context;
        }

        #region GetAllSeats
        [HttpGet]
        public List<FlightSeat> GetSeats([FromQuery(Name = "flightNumber")] string FlightNumber)
        {
            var res = (from fs in db.FlightSeats
                        where fs.FlightNumber == FlightNumber
                        select fs).ToList();

            return res;
        }
        #endregion

        #region Updateseats
        [HttpPut]
        public IActionResult UpdateSeatStatus([FromBody] List<int> selectedSeat)
        {

            var res = (from fs in db.FlightSeats
                        where selectedSeat.Contains(fs.SeatId)
                        select fs).ToList();

            foreach (var r in res)
            {
                r.IsAvailable = false;
                db.FlightSeats.Update(r);
            }
            db.SaveChanges();
            return Ok();
        }

        #endregion

        #region UpdateAvailableSeats
        [HttpPut]
        [Route("updAvailableSeat")]
        public IActionResult UpdateAvailableSeats([FromQuery(Name = "flightNumber")] string FlightNumber,[FromQuery(Name = "classBool")] bool ClassType, [FromQuery(Name = "seatsToUpdate")] int UpdatedSeats)
        {
            try
            {
                var res = (from f in db.Flights
                           where f.FlightNumber == FlightNumber
                           select f).ToList();

                foreach (var r in res)
                {
                    if (ClassType)
                    {
                        r.AvailableBusinessSeats -= UpdatedSeats;
                    }
                    else
                    {
                        r.AvailableEconomySeats -= UpdatedSeats;
                    }
                    db.Flights.Update(r);
                }
                db.SaveChanges();
                return Ok();
            }
            catch (Exception e)
            {
                return NotFound("Error");
            }
            
        }

        #endregion


    }

}
