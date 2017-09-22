using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace BookService.Models.BookModels
{
    /* manages entity objects during run time, which includes populating objects with data from a database, 
    * change tracking, and persisting data to the database. It inherits from DbContext */
    public class BookServiceContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx

        public BookServiceContext() : base("name=BookServiceContext")
        {
            // To trace the SQL
            this.Database.Log = s => System.Diagnostics.Debug.WriteLine(s);
        }

        public System.Data.Entity.DbSet<BookService.Models.BookModels.Author> Authors { get; set; }

        public System.Data.Entity.DbSet<BookService.Models.BookModels.Book> Books { get; set; }
    }
}
