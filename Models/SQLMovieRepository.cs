using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Toonet.Models
{
    public class SQLMovieRepository : IMovieRepository
    {
        private readonly AppDbContext _appDbContext;

        public SQLMovieRepository(AppDbContext appDbContext)
        {
            //Dependency injection for how AppDbContext, for all the tables in our dbcontext.
            this._appDbContext = appDbContext;
        }
        public Movie Add(Movie movie)
        {
            //Adding movie to the DB set of movie
            _appDbContext.movie.Add(movie);
            _appDbContext.SaveChanges();
            return movie;
        }

        public Movie Delete(int id)
        {
            Movie movie = _appDbContext.movie.Find(id);
            //If statement to check if the appdbcontext contains the exact movie looking for to delete
            if (movie != null)
            {
                _appDbContext.movie.Remove(movie);
                _appDbContext.SaveChanges();
            }
            return movie;
        }

        public IEnumerable<Movie> GetAllEducativeMovie()
        {
            //Looking for a particular table enum.
            return _appDbContext.movie.Where(m => m.MovieCategory == MovieCategory.Educative);
        }

        public IEnumerable<Movie> GetAllEntertainmentMovie()
        {
            return _appDbContext.movie.Where(m => m.MovieCategory == MovieCategory.Entertainment);
        }

        public IEnumerable<Movie> GetAllMovie()
        {
            return _appDbContext.movie;
        }

        public IEnumerable<Movie> GetAllReligiousMovie()
        {
            return _appDbContext.movie.Where(m => m.MovieCategory == MovieCategory.Religious);
        }

        public Movie GetMovie(int id)
        {
            return _appDbContext.movie.Find(id);
        }

        public Movie Update(Movie movieChanges)
        {
            var movie = _appDbContext.movie.Attach(movieChanges);
            movie.State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _appDbContext.SaveChanges();
            return movieChanges;
        }
    }
}
