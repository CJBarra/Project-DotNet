using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        { }

        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<UserActivity> UserActivities { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            /* { Provide base OnModelCreating to allow PRIMARY KEY of string for AppUser during Migration } */
            base.OnModelCreating(builder);

            builder.Entity<Value>().HasData(
                new Value { Id = 1, Name = "Value 1" },
                new Value { Id = 2, Name = "Value 2" },
                new Value { Id = 3, Name = "Value 3" }
                );

            // UserActivity as 'ua', Activity as 'a'
            builder.Entity<UserActivity>(x => x.HasKey(ua => new { ua.AppUserId, ua.ActivityId }));

            builder.Entity<UserActivity>()
                .HasOne(ua => ua.AppUser)
                .WithMany(a => a.UserActivities)
                .HasForeignKey(ua => ua.AppUserId);

            builder.Entity<UserActivity>()
                .HasOne(ua => ua.Activity)
                .WithMany(a => a.UserActivities)
                .HasForeignKey(ua => ua.ActivityId);
        }
    }
}