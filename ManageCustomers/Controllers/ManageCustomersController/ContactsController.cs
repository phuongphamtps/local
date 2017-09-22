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
    public class ContactsController : ApiController
    {
        private ManageCustomerEntities db = new ManageCustomerEntities();

        // GET: api/Contacts
        public IQueryable<ContactDTO> GetContacts()
        {
            var contacts = db.Contacts.Select(c =>
            new ContactDTO()
            {
                ContactId = c.ContactId,
                Phone = c.Phone,
                Fax = c.Fax,
                Email = c.Email,
                CustomerId = c.CustomerId
            });
            return contacts;
        }

        // GET: api/Contacts/5
        [ResponseType(typeof(ContactDTO))]
        public IHttpActionResult GetContact(int id)
        {
            var contact = GetContacts().SingleOrDefault(c => c.ContactId == id);
            //Contact contact = db.Contacts.Find(id);
            if (contact == null)
            {
                return NotFound();
            }

            return Ok(contact);
        }

        // PUT: api/Contacts/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutContact(int id, Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != contact.ContactId)
            {
                return BadRequest();
            }

            db.Entry(contact).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(id))
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

        // POST: api/Contacts
        [ResponseType(typeof(Contact))]
        public IHttpActionResult PostContact(Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Contacts.Add(contact);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = contact.ContactId }, contact);
        }

        // DELETE: api/Contacts/5
        [ResponseType(typeof(Contact))]
        public IHttpActionResult DeleteContact(int id)
        {
            Contact contact = db.Contacts.Find(id);
            if (contact == null)
            {
                return NotFound();
            }

            db.Contacts.Remove(contact);
            db.SaveChanges();

            return Ok(contact);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ContactExists(int id)
        {
            return db.Contacts.Count(e => e.ContactId == id) > 0;
        }
    }
}