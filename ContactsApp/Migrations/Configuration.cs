namespace ContactsApp.Migrations
{
    using Models.ContactModels;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ContactsApp.Models.ContactsAppContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "ContactsApp.Models.ContactsAppContext";
        }

        protected override void Seed(ContactsApp.Models.ContactsAppContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
            context.Contacts.AddOrUpdate(
                c => c.FullName,
                new Contact() { FullName = "Andrew Peters", Address="235 Rue Street", City= "Durham", Country="UK" },
                new Contact() { FullName = "Brice Lambson", Address = "1 Bart Somers, Mechelen, Belgium", City = "New York", Country = "US" },
                new Contact() { FullName = "Rowan Miller", Address = "3 Nguyen Trai Street", City = "HCM", Country = "VN" }
                );
        }
    }
}
