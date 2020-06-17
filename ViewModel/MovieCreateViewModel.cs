using Microsoft.AspNetCore.Http;
using Toonet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Toonet.ViewModel
{
    public class MovieCreateViewModel
    {
        public string Name { get; set; }
        public string MovieInfo { get; set; }
        public DateTime ReleseDate { get; set; }
        public IFormFile Photo { get; set; }
        public IFormFile Video { get; set; }
        public MovieCategory movieCategory { get; set; }
    }
}
