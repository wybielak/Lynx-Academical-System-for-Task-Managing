using lynxFileAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace lynxFileAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileManagerController : ControllerBase
    {
        //https://www.youtube.com/watch?v=bN64VNISNw0

        private readonly IManageImage _iManageImage;
        public FileManagerController(IManageImage iManageImage)
        {
            _iManageImage = iManageImage;
        }

        [HttpPost]
        [Route("uploadfile")]
        public async Task<IActionResult> UploadFile(IFormFile _IFormFile)
        {
            var result = await _iManageImage.UploadFile(_IFormFile);
            return Ok(result);
        }

        [HttpGet]
        [Route("downloadfile")]
        public async Task<IActionResult> DownloadFile(string FileName)
        {
            var result = await _iManageImage.DownloadFile(FileName);
            return File(result.Item1, result.Item2, result.Item2);
        }

    }
}
