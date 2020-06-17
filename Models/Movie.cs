using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Toonet.Models
{
    public class Movie
    {
        public int Id { get; set; }
        [NotMapped]
        public string EncryptedId { get; set; }

        public string Name { get; set; }
        public string MovieInfo { get; set; }
        public DateTime DateTime { get; set; }
        public string photopath { get; set; }
        public string videopath { get; set; }
        public MovieCategory MovieCategory { get; set; }
    }
    public enum MovieCategory
    {
        Educative,
        Religious,
        Entertainment
    }
}
