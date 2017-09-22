namespace AngularBookService.Migrations
{
    using Models.BookModels;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<AngularBookService.Models.AngularBookServiceContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(AngularBookService.Models.AngularBookServiceContext context)
        {
            context.Authors.AddOrUpdate(a => a.Id,
                new Author() { Id = 1, Name = "Jane Austen" },
                new Author() { Id = 2, Name = "Charles Dickens" },
                new Author() { Id = 3, Name = "Miguel de Cervantes" }
                );

            context.Books.AddOrUpdate(b => b.Id,
                new Book() { Id = 1, Title = "Pride and Prejudice", Year = 1813, AuthorId = 1, Price = 9.99M, Genre = "Comedy of manners" },
                new Book() { Id = 2, Title = "Northanger Abbey", Year = 1817, AuthorId = 1, Price = 12.95M, Genre = "Gothic parody" },
                new Book() { Id = 3, Title = "David Copperfield", Year = 1850, AuthorId = 2, Price = 15M, Genre = "Bildungsroman" },
                new Book() { Id = 4, Title = "Don Quixote", Year = 1617, AuthorId = 3, Price = 8.95M, Genre = "Picaresque" }
                );
        }
    }
}
