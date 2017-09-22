using ManageCustomers.Models.ManageCustomersModels;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ManageCustomers.Models.ManageCustomersDTO
{
    public class ContactDTO
    {
        public int ContactId { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public int CustomerId { get; set; }
    }
}