using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Toonet.Models;
using Toonet.Security;
using Toonet.ViewModel;

namespace Toonet.Controllers
{
    [DisableRequestSizeLimit]
    public class HomeController : Controller
    {
        // It is through IDataProtector interface Protect and Unprotect methods,
        // we encrypt and decrypt respectivel
        private readonly ILogger<HomeController> _logger;
        private readonly IMovieRepository _movieRepository;
        private readonly IHostingEnvironment _hostingEnviroment;
        private readonly IDataProtector protector;
        private readonly long _fileSizeLimit;
        public HomeController(ILogger<HomeController> logger, IMovieRepository movieRepository, IHostingEnvironment hostingEnviroment, IDataProtectionProvider dataProtectionProvider,
                              DataProtectionPurposeStrings dataProtectionPurposeStrings, IConfiguration config)
        {
            _logger = logger;
            this._movieRepository = movieRepository;
            this._hostingEnviroment = hostingEnviroment;
            protector = dataProtectionProvider.CreateProtector(
                dataProtectionPurposeStrings.MovieIdRouteValue);
            _fileSizeLimit = config.GetValue<long>("FileSizeLimit");
        }

        #region Index
        [AllowAnonymous]
        public IActionResult Index()
        {
            var model = _movieRepository.GetAllMovie();
            return View(model);
        }

        //[AllowAnonymous]
        //public IActionResult Index()
        //{
        //    var model = _movieRepository.GetAllMovie()
        //                    .Select(e =>
        //                    {
        //                        // Encrypt the ID value and store in EncryptedId property
        //                        e.EncryptedId = protector.Protect(e.Id.ToString());
        //                        return e;
        //                    });
        //    return View(model);
        //}

        public IActionResult IndexEntertainment()
        {
            var model = _movieRepository.GetAllEntertainmentMovie();
            //.Select(e =>
            //{
            //    e.EncryptedId = protector.Protect(e.Id.ToString());
            //    return e;
            //});
            return View(model);
        }

        public IActionResult IndexEducative()
        {
            var model = _movieRepository.GetAllEducativeMovie();
            //    .Select(e =>
            //{
            //    e.EncryptedId = protector.Protect(e.Id.ToString());
            //    return e;
            //});
            return View(model);
        }

        public IActionResult IndexReligious()
        {
            var model = _movieRepository.GetAllReligiousMovie();
            //    .Select(e =>
            //{
            //    e.EncryptedId = protector.Protect(e.Id.ToString());
            //    return e;
            //});
            return View(model);
        }

        #endregion

        #region Details
        [AllowAnonymous]
        public ViewResult Details(int? id)
        {
            MovieDetailsViewModel movieDetailsViewModel = new MovieDetailsViewModel()
            {
                Movie = _movieRepository.GetMovie(id ?? 1),
                PageTitle = _movieRepository.GetMovie(id ?? 1).Name
            };
            return View(movieDetailsViewModel);
        }

        // Details view receives the encrypted Movie ID
        //[AllowAnonymous]
        //public ViewResult Details(string id)
        //{
        //    // Decrypt the movie id using Unprotect method
        //    int movieId = Convert.ToInt32(protector.Unprotect(id));

        //    Movie movie = _movieRepository.GetMovie(movieId);
        //    if (movie == null)
        //    {
        //        Response.StatusCode = 404;
        //        return View("NotFound", movieId);
        //    }

        //    MovieDetailsViewModel movieDetailsViewModel = new MovieDetailsViewModel()
        //    {
        //       Movie = movie,
        //       PageTitle = "Movie Details"
        //    };
        //    return View(movieDetailsViewModel);
        //}

        #endregion
        #region Create
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public ViewResult Create()
        {
            return View();
        }

        private string ProcessUploadedFile(MovieCreateViewModel model)
        {
            string uniqueFileName = null;
            if (model.Photo != null)
            {
                string uploadFolder = Path.Combine(_hostingEnviroment.WebRootPath, "images");
                uniqueFileName = Guid.NewGuid().ToString() + "_" + model.Photo.FileName;
                string filePath = Path.Combine(uploadFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    model.Photo.CopyTo(fileStream);
                }
            }
            return uniqueFileName;
        }

        private string ProcessUploadedVideo(MovieCreateViewModel model)
        {
            string uniqueVideoFile = null;
            if (model.Video != null && model.Video.Length < 3221225472)
            {
                string uploadfolder = Path.Combine(_hostingEnviroment.WebRootPath, "videos");
                uniqueVideoFile = Guid.NewGuid().ToString() + "_" + model.Video.FileName;
                string filePath = Path.Combine(uploadfolder, uniqueVideoFile);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    model.Video.CopyTo(fileStream);
                }
            }
            return uniqueVideoFile;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult Create(MovieCreateViewModel model)
        {
            if (ModelState.IsValid)
            {
                string uniqueFileName = ProcessUploadedFile(model);
                string uniqueVideoFile = ProcessUploadedVideo(model);
                Movie newMovie = new Movie
                {
                    Name = model.Name,
                    DateTime = model.ReleseDate,
                    MovieInfo = model.MovieInfo,
                    videopath = uniqueVideoFile,
                    MovieCategory = model.movieCategory,
                    photopath = uniqueFileName
                };
                _movieRepository.Add(newMovie);
                return RedirectToAction("Details", new { id = newMovie.Id });
            }
            return View();
        }
        #endregion
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public ViewResult Edit(int id)
        {
            Movie movie = _movieRepository.GetMovie(id);
            MovieEditViewModel movieEditViewModel = new MovieEditViewModel()
            {
                Id = movie.Id,
                Name = movie.Name,
                MovieInfo = movie.MovieInfo,
                ReleseDate = movie.DateTime,
                ExistingPhotoPath = movie.photopath
            };
            return View(movieEditViewModel);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult Edit(MovieEditViewModel model)
        {
            if (ModelState.IsValid)
            {
                Movie movie = _movieRepository.GetMovie(model.Id);
                movie.Name = model.Name;
                movie.DateTime = model.ReleseDate;
                movie.MovieInfo = model.MovieInfo;
                if (model.Photo != null)
                {
                    if (model.ExistingPhotoPath != null)
                    {
                        string filePath = Path.Combine(_hostingEnviroment.WebRootPath, "images", model.ExistingPhotoPath);
                        System.IO.File.Delete(filePath);
                    }
                    movie.photopath = ProcessUploadedFile(model);
                }
                _movieRepository.Update(movie);
                return RedirectToAction("Details");
            }
            return View();
        }

        public IActionResult Delete(int? Id)
        {
            MovieDetailsViewModel movieDetailsViewModel = new MovieDetailsViewModel()
            {
                Movie = _movieRepository.Delete(Id ?? 1),
                PageTitle = "Employee Details"
            };
            return RedirectToAction("Index", movieDetailsViewModel);
        }
        public IActionResult Privacy()
        {
            return View();
        }

        //[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        //public IActionResult Error()
        //{
        //    return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        //}
    }
}