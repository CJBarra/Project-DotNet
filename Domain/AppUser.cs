using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    /* { IdentityUser requires, NuGet package 'Microsoft.AspNetCore.Identity.EntityFrameworkCore' } */
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public virtual ICollection<UserActivity> UserActivities { get; set; }
    }

}