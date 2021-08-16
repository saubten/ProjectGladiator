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
    public class AdminController : ControllerBase
    {
        private readonly AirlineReservationContext db;

        public AdminController(AirlineReservationContext context)
        {
            db = context;
        }

        /// <summary>
        /// To get all the flight details by date
        /// </summary>
        /// <returns>Flights</returns>
        #region GetFlightDetails
        [HttpGet]
        public IActionResult GetFlights()
        {
            var allFlights = db.Flights.OrderByDescending(f => f.DepartureDate).ThenByDescending(f => f.DepartureTime).ToList();

            return Ok(allFlights);
        }
        #endregion


        #region DeleteFlight

        [HttpPut]
        [Route("softFDeleteFlight")]
        public IActionResult DeleteFlight([FromQuery(Name ="flightNumber")] string flightNumber)
        {
            try
            {
                var flight = (from f in db.Flights
                              where f.FlightNumber == flightNumber
                              select f).First();
                flight.IsCancelled = true;

                //Both trips
                var allFlightBookings = db.Bookings.Where(b => b.FlightNumber == flightNumber).ToList();
                foreach (var afb in allFlightBookings)
                {
                    afb.IsCancelled = true;
                    db.Bookings.Update(afb);
                    var oticketfare = afb.TicketFare;
                    var rticketfare = (decimal)0.00;
                    if (afb.IsReturn)
                    {
                        var rflight = db.RoundTrips.Where(r => r.BookingId == afb.BookingId).FirstOrDefault();
                        rflight.IsCancelled = true;
                        rticketfare = rflight.TicketFare;
                        db.RoundTrips.Update(rflight);
                    }
                    var totalfare = oticketfare + rticketfare;

                    var tid = db.Bookings.Where(b => b.BookingId == afb.BookingId).Select(s => s.TransactionId).FirstOrDefault();
                    var uid = db.TransactionTbs.Where(t => t.TransactionId == tid).Select(s => s.UserId).FirstOrDefault();
                    var user = db.Users.Where(u => u.UserId == uid).FirstOrDefault();

                    user.WalletAmount += totalfare;
                    db.Users.Update(user);
                }

                var returnFlightBookings = db.RoundTrips.Where(b => b.FlightNumber == flightNumber).ToList();
                foreach (var rfb in returnFlightBookings)
                {
                    rfb.IsCancelled = true;
                    db.RoundTrips.Update(rfb);
                    var rticketfare = rfb.TicketFare;

                    var tid = db.Bookings.Where(b => b.BookingId == rfb.BookingId).Select(s => s.TransactionId).FirstOrDefault();
                    var uid = db.TransactionTbs.Where(t => t.TransactionId == tid).Select(s => s.UserId).FirstOrDefault();
                    var user = db.Users.Where(u => u.UserId == uid).FirstOrDefault();
                    user.WalletAmount += rticketfare;
                    db.Users.Update(user);
                }


                db.SaveChanges();

                return Ok("Flight Deleted");
            }
            catch(Exception e)
            {
                return NotFound("Wrong Flight Number");
            }
            
        }
        #endregion

        /// <summary>
        /// For Admin to add flight
        /// </summary>
        /// <param name="flight"></param>
        /// <returns>Success message</returns>
        #region AddFlights
        [HttpPost]
        public IActionResult  PostFlight([FromBody] Flight flight)
        {
            try
            {
                db.Flights.Add(flight);
                db.SaveChanges();

                return Ok("Flight Added");
            }
            catch (Exception e)
            {
                return NotFound("Already Exists");
            }
        }

        #endregion

        #region AdminLogin
        [HttpGet]
        [Route("login")]
        public IActionResult checkLogin([FromQuery(Name = "email")] string email, [FromQuery(Name = "password")] string password)
        {
            try
            {
                var result = db.Admins.Where(x => x.AdminId == email && x.Password == password).FirstOrDefault();
                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound("Invalid");
                }
            }
            catch (Exception e)
            {
                return Ok(e.Message);
            }
        }
        #endregion
    }
}
