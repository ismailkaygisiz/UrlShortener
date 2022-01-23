using Business.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Mvc;
using System;

namespace WebAPI.Controllers
{
    public class UrlsController : ControllerRepository<Url, Guid>
    {
        private readonly IUrlService _urlService;

        public UrlsController(IUrlService urlService) : base(urlService)
        {
            _urlService = urlService;
        }

        [HttpPost("[action]")]
        public IActionResult AddWithEntity(Url url)
        {
            var result = _urlService.AddWithEntity(url);
            if (result.Success)
                return Ok(result);

            return BadRequest(result);
        }

        [HttpGet("[action]")]
        public IActionResult GetByKeyword(string keyword)
        {
            var result = _urlService.GetByKeyword(keyword);
            if (result.Success)
                return Ok(result);

            return BadRequest(result);
        }

        [HttpGet("[action]")]
        public IActionResult GetByCode(string code)
        {
            var result = _urlService.GetByCode(code);
            if (result.Success)
                return Ok(result);

            return BadRequest(result);
        }

        [HttpPost("[action]")]
        public IActionResult Redirect(Url url)
        {
            var result = _urlService.Redirect(url);
            if (result.Success)
                return Ok(result);

            return BadRequest(result);
        }
    }
}
