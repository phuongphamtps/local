using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ManageCustomers.Models.ManageCustomersDTO
{
    // A DTO is an object that defines how the data will be sent over the network
    public class CustomerDTO
    {
        public int CustomerId { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public string ZipCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string ProfileImage { get; set; }
    }
}