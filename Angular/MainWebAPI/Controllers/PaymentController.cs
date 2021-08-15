using MainWebAPI.Models;
using MainWebAPI.ViewModel;
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
    public class PaymentController : ControllerBase
    {
        private readonly AirlineReservationContext db;

        public PaymentController(AirlineReservationContext context)
        {
            db = context;
        }

        [HttpPost]
        public IActionResult AddTransaction([FromBody] AddTransaction transactionTb)
        {
            try
            {
                TransactionTb t = new TransactionTb();
                t.UserId = transactionTb.UserId;
                t.TransactionAmount = transactionTb.TransactionAmount;
                
                db.TransactionTbs.Add(t);
                db.SaveChanges();

                var tnew = db.TransactionTbs.Where(u => u.UserId == t.UserId).OrderByDescending(d => d.DateOfTransaction).FirstOrDefault();
                return Ok(tnew);

            }

            catch (Exception e)
            {
                return BadRequest("Invalid data");
            }
            
        }

        [HttpGet]
        public IActionResult GetTransactionId([FromQuery] int UserID)
        {

            var tid = (from t in db.TransactionTbs
                       where t.UserId == UserID
                       select new { t.TransactionId }).ToList().OrderByDescending(c => c.TransactionId).First();

            return Ok(tid);

        }
    }
}
