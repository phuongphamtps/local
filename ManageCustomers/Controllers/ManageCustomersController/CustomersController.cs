using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ManageCustomers.Models.ManageCustomersModels;
using ManageCustomers.Models.ManageCustomersDTO;

namespace ManageCustomers.Controllers.ManageCustomersController
{
    public class CustomersController : ApiController
    {
        private ManageCustomerEntities db = new ManageCustomerEntities();

        [Route("api/customers/search")]
        [HttpGet]
        public IEnumerable<CustomerDTO> SearchCustomers(string searchText)
        {
            var customers = GetCustomers()
            .Where(c => 
                c.FullName.Contains(searchText) ||
                c.City.Contains(searchText) ||
                c.Country.Contains(searchText))
            .Take(20);
            return customers;
        }

        // GET: api/Customers
        [Route("api/customers")]
        [HttpGet]
        public IQueryable<CustomerDTO> GetCustomers()
        {
            var customers = db.Customers.Select(c =>
            new CustomerDTO()
            {
                CustomerId = c.CustomerId,
                FullName = c.FullName,
                Address = c.Address,
                ZipCode = c.ZipCode,
                City = c.City,
                Country = c.Country,
                ProfileImage = c.ProfileImage
            });
            return customers;
        }

        // GET: api/Customers/5
        [ResponseType(typeof(CustomerDTO))]
        public IHttpActionResult GetCustomer(int id)
        {
            var customer = GetCustomers().SingleOrDefault(c => c.CustomerId == id);
            //Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        // PUT: api/Customers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCustomer(int id, Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customer.CustomerId)
            {
                return BadRequest();
            }

            db.Entry(customer).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Customers
        [ResponseType(typeof(Customer))]
        public IHttpActionResult PostCustomer(Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Customers.Add(customer);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = customer.CustomerId }, customer);
        }

        // DELETE: api/Customers/5
        [ResponseType(typeof(Customer))]
        public IHttpActionResult DeleteCustomer(int id)
        {
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            db.Customers.Remove(customer);
            db.SaveChanges();

            return Ok(customer);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustomerExists(int id)
        {
            return db.Customers.Count(e => e.CustomerId == id) > 0;
        }
    }
}