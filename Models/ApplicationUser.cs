using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Toonet.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public StudentGuadian studentGuadian { get; set; }
    }
    public enum StudentGuadian
    {
        Teacher,
        Parent,
        Guardian
    }
}
