using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookService.Models.BookServiceDTO
{
    // Class contains a subset of properties from BookDetailDTO
    public class BookDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string AuthorName { get; set; }
    }
}