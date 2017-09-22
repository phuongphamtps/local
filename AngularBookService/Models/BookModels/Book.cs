﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AngularBookService.Models.BookModels
{
    public class Book
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
        public string Genre { get; set; }

        //Foreign key
        public int AuthorId { get; set; }

        // Virtual navigation property
        public virtual Author Author { get; set; }
    }
}