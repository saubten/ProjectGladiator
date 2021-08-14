using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MainWebAPI.Models;
using System.Net.Mail;
using System.Net;
using Microsoft.EntityFrameworkCore;

namespace MainWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AirlineReservationContext db;

        public UserController(AirlineReservationContext context)
        {
            db = context;
        }

        private int SendEmailOtp(string to)
        {
            using SmtpClient smtp = new SmtpClient
            {
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                EnableSsl = true,
                Host = "smtp.gmail.com",
                Port = 587,
                Credentials = new NetworkCredential("SAKKairlines@gmail.com","SAKK@123"),
            };

            string subject = "SAKK Airlines OTP";
            Random rand = new Random();
            int otp = rand.Next(100000, 999999);
            string body = "OTP : " + otp;
            try
            {
                smtp.Send("SAKKairlines@gmail.com", to, subject, body);
                return otp;
            }
            catch (Exception e)
            {
                return -1;
            }   
        }
        [HttpGet]
        [Route("OTP")]
        public IActionResult SendOTPtoEmail([FromQuery(Name ="userEmail")] string Email)
        {
            User user = db.Users.Where(u => u.EmailId == Email).FirstOrDefault();

            int otp = SendEmailOtp(Email);
            return Ok(new { otp = otp } );

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await db.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("(e)")]
        public async Task<ActionResult<User>> GetUser(string e)
        {
            var user = await db.Users.FindAsync(e);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }


        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {

            db.Users.Add(user);
            await db.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }

        [HttpGet]
        [Route("sendRegId")]
        public IActionResult ForTheUser([FromQuery(Name ="email")] string email)
        {
            var id = db.Users.Where(u => u.EmailId == email).Select(u => u.UserId).First();

            using SmtpClient smtp = new SmtpClient
            {
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                EnableSsl = true,
                Host = "smtp.gmail.com",
                Port = 587,
                Credentials = new NetworkCredential("SAKKairlines@gmail.com", "SAKK@123"),
            };

            string body = "Your User ID is " + id;
            smtp.Send("SAKKairlines@gmail.com", email, "User Registration Number", body);

            return Ok("Check Your Email");
        }

        [HttpGet]
        [Route("getUserId")]
        public IActionResult GetUserId([FromQuery(Name = "email")] string email)
        {
            var id = db.Users.Where(u => u.EmailId == email).Select(u => u.UserId).First();
            return Ok(id);
        }

        //NOT SERVICED YET 
        [HttpGet]
        [Route("checkPassword")]
        public IActionResult CheckPassword([FromQuery(Name = "email")] string email)
        {
            var id = db.Users.Where(u => u.EmailId == email).Select(u => u.UserId).First();
            return Ok(id);
        }

        [HttpGet]
        [Route("getBookings")]
        public IActionResult GetBookings([FromQuery(Name = "email")] string email)
        {
            var id = db.Users.Where(u => u.EmailId == email).Select(u => u.UserId).First();
            var transactionIds = db.TransactionTbs.Where(u => u.UserId == id).Select(t => t.TransactionId).ToList();
            //var bookings = (from b in db.Bookings
            //                join f in db.Flights on b.FlightNumber equals f.FlightNumber
            //                join sr in (from r in db.RoundTrips
            //                            join fr in db.Flights on r.FlightNumber equals fr.FlightNumber
            //                            select new { r,fr}) 
            //                            on b.BookingId equals sr.r.BookingId into rs
            //                from sr in rs.DefaultIfEmpty()
            //                where transactionIds.Contains(b.TransactionId)
            //                select new
            //                {
            //                    BookingID = b.BookingId,
            //                    OFlight = b.FlightNumber,
            //                    OTicketFare = b.TicketFare,
            //                    OClass = b.IsBusiness,
            //                    OSource = f.FromLocation,
            //                    ODestination = f.ToLocation,
            //                    ODepartureDate = f.DepartureDate,
            //                    BCancelled = b.IsCancelled,
            //                    RTripBool = b.IsReturn,
            //                    RoundTripID = sr.r == null ? -1 : sr.r.RoundTripId,
            //                    RFlight = sr.r == null ? "-" : sr.r.FlightNumber,
            //                    RTicketFare = sr.r == null ? -1 : sr.r.TicketFare,
            //                    RClass = sr.r == null ? false : sr.r.IsBusiness,
            //                    RSource = sr.fr.FromLocation,
            //                    RDestination = sr.fr.ToLocation,
            //                    RDepartureDate = sr.fr.DepartureDate,
            //                    RCancelled = sr.r == null ? false : sr.r.IsCancelled,
            //                }).OrderByDescending(c=>c.BookingID).ToList();

            var bookings = ( from b in db.Bookings
                                where transactionIds.Contains(b.TransactionId)
                                select b.BookingId ).ToList(); 

            var OWbookings = (from b in db.Bookings
                              join f in db.Flights on b.FlightNumber equals f.FlightNumber
                              where transactionIds.Contains(b.TransactionId)
                              select new
                              {
                                  BookingID = b.BookingId,
                                  OFlight = b.FlightNumber,
                                  OTicketFare = b.TicketFare,
                                  OClass = b.IsBusiness,
                                  OSource = f.FromLocation,
                                  ODestination = f.ToLocation,
                                  ODepartureDate = f.DepartureDate,
                                  BCancelled = b.IsCancelled,
                                  RTripBool = b.IsReturn,
                              }).OrderByDescending(c => c.BookingID).ToList();
            var RTbookings = (from r in db.RoundTrips
                              join f in db.Flights on r.FlightNumber equals f.FlightNumber
                              where bookings.Contains( r.BookingId)
                              select new
                              {
                                  RBookingId = r.BookingId,
                                  RoundTripID = r.RoundTripId,
                                  RFlight = r.FlightNumber,
                                  RTicketFare = r.TicketFare,
                                  RClass = r.IsBusiness,
                                  RSource = f.FromLocation,
                                  RDestination = f.ToLocation,
                                  RDepartureDate = f.DepartureDate,
                                  RCancelled = r.IsCancelled,
                              }).ToList();

            return Ok(new {OWbookings,RTbookings});
        }


    }
}
