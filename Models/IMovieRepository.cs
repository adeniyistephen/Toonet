using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Toonet.Models
{
    public interface IMovieRepository
    {
        Movie GetMovie(int id);
        IEnumerable<Movie> GetAllMovie();
        Movie Add(Movie movie);
        Movie Delete(int id);
        Movie Update(Movie movieChanges);
        IEnumerable<Movie> GetAllEducativeMovie();
        IEnumerable<Movie> GetAllEntertainmentMovie();
        IEnumerable<Movie> GetAllReligiousMovie();
    }
}
